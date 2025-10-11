/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Upload, X, Plus, Trash, MapPin, ChevronDown } from "lucide-react";
import Image from "next/image";

import {
  TournamentCreateRequest,
  BadmintonCategoryEnum,
} from "@/schemaValidations/tournament.schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import tournamentApiRequest from "@/apiRequest/tournament";
import addressApiRequest from "@/apiRequest/address";
import { useRouter } from "next/navigation";

// Interfaces for address data
interface Province {
  id: string;
  full_name: string;
}

interface Ward {
  id: string;
  full_name: string;
}

// Helper function to get readable labels for categories
export function getCategoryLabel(category: string): string {
  const map: Record<string, string> = {
    MEN_SINGLE: "Đơn nam",
    WOMEN_SINGLE: "Đơn nữ",
    MEN_DOUBLE: "Đôi nam",
    WOMEN_DOUBLE: "Đôi nữ",
    MIXED_DOUBLE: "Đôi nam nữ",
  };
  return map[category] ?? category;
}

// Helper function to format date string for backend
function toLocalDateTime(dateString: string) {
  if (!dateString) return null;
  // Nếu đã có "T" (đã bao gồm giờ) thì giữ nguyên
  return dateString.includes("T") ? dateString : `${dateString}T00:00:00`;
}

export default function TournamentCreateForm({
  onCreated,
}: {
  onCreated?: () => void;
}) {
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Address related states
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedWardId, setSelectedWardId] = useState("");
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(true);
  const [isLoadingWards, setIsLoadingWards] = useState(false);
  const [additionalAddress, setAdditionalAddress] = useState("");
  const router = useRouter();
  const form = useForm<TournamentCreateRequest>({
    resolver: zodResolver(TournamentCreateRequest),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      bannerUrl: "",
      logoUrl: "",
      startDate: "",
      endDate: "",
      rules: "",
      registrationStartDate: "",
      registrationEndDate: "",
      fee: 0,
      categories: [
        {
          categoryType: "MEN_SINGLE",
          minLevel: 1,
          maxLevel: 5,
          maxParticipants: 16,
        },
      ],
    },
  });

  const { control, register } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });
  const { setValue } = form;

  // Load provinces when component mounts
  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const response = await addressApiRequest.getProvinces();
        setProvinces(response.payload.data.data || []);
      } catch (error) {
        console.error("Error loading provinces:", error);
        toast.error("Lỗi", {
          description: "Không thể tải danh sách tỉnh thành.",
        });
      } finally {
        setIsLoadingProvinces(false);
      }
    };
    loadProvinces();
  }, []);

  // Load wards when province changes
  useEffect(() => {
    if (!selectedProvinceId) {
      setWards([]);
      setSelectedWardId("");
      return;
    }
    const loadWards = async () => {
      setIsLoadingWards(true);
      try {
        const response = await addressApiRequest.getWardsByProvinceId(
          selectedProvinceId
        );
        setWards(response.payload.data.data || []);
        setSelectedWardId("");
      } catch (error) {
        console.error("Error loading wards:", error);
        setWards([]);
      } finally {
        setIsLoadingWards(false);
      }
    };
    loadWards();
  }, [selectedProvinceId]);

  // Update location field when address parts change
  useEffect(() => {
    const updateLocation = () => {
      const selectedProvince = provinces.find(
        (p) => p.id === selectedProvinceId
      );
      const selectedWard = wards.find((w) => w.id === selectedWardId);
      const locationParts: string[] = [];

      if (additionalAddress) locationParts.push(additionalAddress);
      if (selectedWard) locationParts.push(selectedWard.full_name);
      if (selectedProvince) locationParts.push(selectedProvince.full_name);

      const fullLocation = locationParts.join(", ");
      setValue("location", fullLocation, { shouldValidate: true });
    };
    updateLocation();
  }, [
    selectedProvinceId,
    selectedWardId,
    additionalAddress,
    provinces,
    wards,
    setValue,
  ]);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvinceId(e.target.value);
  };

  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWardId(e.target.value);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "banner" | "logo"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (type === "banner") {
      setBannerPreview(url);
      setBannerImage(file);
      form.setValue("bannerUrl", file.name, { shouldValidate: true }); // For validation
    } else {
      setLogoPreview(url);
      setLogoImage(file);
      form.setValue("logoUrl", file.name, { shouldValidate: true }); // For validation
    }
  };

  const onSubmit = async (data: TournamentCreateRequest) => {
    try {
      let uploadedBannerUrl = "";
      if (bannerImage) {
        const formData = new FormData();
        formData.append("files", bannerImage);
        const uploadRes = await tournamentApiRequest.uploadImageTournament(
          formData
        );
        uploadedBannerUrl = uploadRes.payload.data.fileName;
      }

      let uploadedLogoUrl = "";
      if (logoImage) {
        const formData = new FormData();
        formData.append("files", logoImage);
        const uploadRes = await tournamentApiRequest.uploadImageTournament(
          formData
        );
        uploadedLogoUrl = uploadRes.payload.data.fileName;
      }

      await tournamentApiRequest.createTournament({
        ...data,
        logoUrl: uploadedLogoUrl,
        bannerUrl: uploadedBannerUrl,
        startDate: toLocalDateTime(data.startDate) || "",
        endDate: toLocalDateTime(data.endDate) || "",
        registrationStartDate:
          toLocalDateTime(data.registrationStartDate) || "",
        registrationEndDate: toLocalDateTime(data.registrationEndDate) || "",
      });

      toast.success("Tạo giải đấu thành công!");
      form.reset();
      setBannerPreview(null);
      setLogoPreview(null);
      setBannerImage(null);
      setLogoImage(null);
      setSelectedProvinceId("");
      setAdditionalAddress("");
      router.refresh();
      onCreated?.();
    } catch (error) {
      toast.error("Tạo giải đấu thất bại!", {
        description: "Có lỗi xảy ra, vui lòng kiểm tra lại thông tin.",
      });
    }
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-700 shadow-lg dark:bg-gray-800 max-w-4xl mx-auto">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* General Information */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tên giải đấu <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="VD: Giải Cầu Lông Mùa Xuân 2025"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập mô tả chi tiết về giải đấu..."
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rules"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Điều lệ giải đấu</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập điều lệ giải đấu..."
                      {...field}
                      rows={6}
                      className="whitespace-pre-line"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address Selection */}
            <div className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <FormLabel className="text-base font-semibold">
                  Địa điểm <span className="text-red-500">*</span>
                </FormLabel>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium mb-2">
                    Tỉnh thành <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedProvinceId}
                    onChange={handleProvinceChange}
                    disabled={isLoadingProvinces}
                    className="appearance-none block w-full px-3 py-3 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all disabled:opacity-50"
                  >
                    <option value="">
                      {isLoadingProvinces ? "Đang tải..." : "Chọn tỉnh thành"}
                    </option>
                    {provinces.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.full_name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                {selectedProvinceId && (
                  <div className="relative animate-in slide-in-from-top-2 duration-300">
                    <label className="block text-sm font-medium mb-2">
                      Phường/Xã
                    </label>
                    <select
                      value={selectedWardId}
                      onChange={handleWardChange}
                      disabled={isLoadingWards}
                      className="appearance-none block w-full px-3 py-3 pr-8 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all disabled:opacity-50"
                    >
                      <option value="">
                        {isLoadingWards
                          ? "Đang tải..."
                          : "Chọn phường xã (tùy chọn)"}
                      </option>
                      {wards.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.full_name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Địa chỉ chi tiết (tùy chọn)
                </label>
                <Input
                  placeholder="Ví dụ: Sân cầu lông ABC, Số 123, đường DEF..."
                  value={additionalAddress}
                  onChange={(e) => setAdditionalAddress(e.target.value)}
                />
              </div>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Địa chỉ đầy đủ
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Địa chỉ sẽ được tạo tự động..."
                        className="bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Image Uploads */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <FormLabel>Ảnh banner</FormLabel>
                <div className="relative border-2 border-dashed rounded-md p-4 mt-2 text-center hover:border-green-500 transition">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => handleImageUpload(e, "banner")}
                  />
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500 mt-2">Nhấp để chọn ảnh</p>
                </div>
                {bannerPreview && (
                  <div className="mt-3 relative">
                    <Image
                      src={bannerPreview}
                      alt="banner"
                      className="rounded-md w-full h-48 object-cover"
                      width={600}
                      height={300}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setBannerPreview(null);
                        setBannerImage(null);
                        form.setValue("bannerUrl", "");
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="bannerUrl"
                  render={() => (
                    <FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormLabel>Logo giải đấu</FormLabel>
                <div className="relative border-2 border-dashed rounded-md p-4 mt-2 text-center hover:border-green-500 transition">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => handleImageUpload(e, "logo")}
                  />
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500 mt-2">
                    Nhấp để chọn logo
                  </p>
                </div>
                {logoPreview && (
                  <div className="mt-3 relative w-32 h-32">
                    <Image
                      src={logoPreview}
                      alt="logo"
                      className="rounded-full w-32 h-32 object-cover"
                      width={128}
                      height={128}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setLogoPreview(null);
                        setLogoImage(null);
                        form.setValue("logoUrl", "");
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="logoUrl"
                  render={() => (
                    <FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phí tham gia (VNĐ)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ví dụ: 50000"
                      className="h-12 text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Date Fields */}
            <div className="grid sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="registrationStartDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Bắt đầu đăng ký <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="registrationEndDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Kết thúc đăng ký <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Ngày bắt đầu giải <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Ngày kết thúc giải <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Dynamic Categories */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel className="text-base font-medium">
                  Hạng mục thi đấu
                </FormLabel>
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      categoryType: "MEN_SINGLE",
                      minLevel: 1,
                      maxLevel: 5,
                      maxParticipants: 16,
                    })
                  }
                >
                  <Plus size={16} className="mr-1" /> Thêm hạng mục
                </Button>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-4 gap-4 items-end border p-4 rounded-lg"
                >
                  {/* Chọn loại */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Loại
                    </label>
                    <select
                      {...register(`categories.${index}.categoryType` as const)}
                      className="border rounded-md p-2 w-full dark:bg-gray-700 dark:text-white"
                    >
                      {BadmintonCategoryEnum.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {getCategoryLabel(opt)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Trình độ */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Trình độ tối thiểu
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min={0}
                      max={5}
                      {...register(`categories.${index}.minLevel`, {
                        valueAsNumber: true,
                      })}
                      className="border rounded-md p-2 w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Trình độ tối đa
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min={0}
                      max={5}
                      {...register(`categories.${index}.maxLevel`, {
                        valueAsNumber: true,
                      })}
                      className="border rounded-md p-2 w-full"
                    />
                  </div>

                  {/* Số lượng */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Người tham gia tối đa
                    </label>
                    <input
                      type="number"
                      {...register(`categories.${index}.maxParticipants`, {
                        valueAsNumber: true,
                      })}
                      className="border rounded-md p-2 w-full"
                    />
                  </div>

                  {/* Nút xoá */}
                  <div className="col-span-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-600 text-sm mt-2"
                    >
                      Xóa hạng mục
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full h-12 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
            >
              {form.formState.isSubmitting ? "Đang tạo..." : "Tạo Giải Đấu"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
