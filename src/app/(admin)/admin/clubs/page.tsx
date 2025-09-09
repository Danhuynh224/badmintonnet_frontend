'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Download,
  Users
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

type Club = {
  id: string;
  name: string;
  ownerName: string;
  ownerEmail: string;
  memberCount: number;
  status: 'active' | 'inactive' | 'pending';
  createdDate: string;
};

export default function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dữ liệu mẫu
  const clubs: Club[] = [
    {
      id: '1',
      name: 'Câu lạc bộ Cầu lông Hà Nội',
      ownerName: 'Nguyễn Văn A',
      ownerEmail: 'admin@gmail.com',
      memberCount: 45,
      status: 'active',
      createdDate: '2023-01-15',
    },
    {
      id: '2',
      name: 'Câu lạc bộ Bóng bàn Sài Gòn',
      ownerName: 'Trần Thị B',
      ownerEmail: 'user1@example.com',
      memberCount: 32,
      status: 'active',
      createdDate: '2023-02-20',
    },
    {
      id: '3',
      name: 'Câu lạc bộ Tennis Đà Nẵng',
      ownerName: 'Lê Văn C',
      ownerEmail: 'user2@example.com',
      memberCount: 28,
      status: 'pending',
      createdDate: '2023-03-10',
    },
    {
      id: '4',
      name: 'Câu lạc bộ Bóng đá Cần Thơ',
      ownerName: 'Phạm Thị D',
      ownerEmail: 'user3@example.com',
      memberCount: 56,
      status: 'inactive',
      createdDate: '2023-04-05',
    },
    {
      id: '5',
      name: 'Câu lạc bộ Bơi lội Huế',
      ownerName: 'Hoàng Văn E',
      ownerEmail: 'user4@example.com',
      memberCount: 18,
      status: 'active',
      createdDate: '2023-05-12',
    },
  ];

  // Lọc câu lạc bộ dựa trên các bộ lọc
  const filteredClubs = clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.ownerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || club.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Hiển thị badge trạng thái
  const getStatusBadge = (status: Club['status']) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Hoạt động
          </Badge>
        );
      case 'inactive':
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
            Không hoạt động
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
            Chờ duyệt
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Quản lý câu lạc bộ</h1>
          <p className="text-muted-foreground text-gray-500 dark:text-gray-400">Quản lý tất cả câu lạc bộ trong hệ thống</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Xuất Excel
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Danh sách câu lạc bộ</CardTitle>
          <CardDescription>Tổng cộng {clubs.length} câu lạc bộ trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo tên, chủ sở hữu..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div className="w-40">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                    <SelectItem value="pending">Chờ duyệt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên câu lạc bộ</TableHead>
                  <TableHead>Chủ sở hữu</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Số thành viên</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClubs.map((club) => (
                  <TableRow key={club.id}>
                    <TableCell className="font-medium">{club.name}</TableCell>
                    <TableCell>{club.ownerName}</TableCell>
                    <TableCell>{club.ownerEmail}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{club.memberCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(club.status)}</TableCell>
                    <TableCell>{new Date(club.createdDate).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="h-4 w-4 mr-2" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          {club.status === 'pending' && (
                            <DropdownMenuItem className="cursor-pointer text-green-600">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Phê duyệt
                            </DropdownMenuItem>
                          )}
                          {club.status === 'active' ? (
                            <DropdownMenuItem className="cursor-pointer text-orange-600">
                              <XCircle className="h-4 w-4 mr-2" />
                              Vô hiệu hóa
                            </DropdownMenuItem>
                          ) : club.status === 'inactive' ? (
                            <DropdownMenuItem className="cursor-pointer text-green-600">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Kích hoạt
                            </DropdownMenuItem>
                          ) : null}
                          <DropdownMenuItem className="cursor-pointer text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}