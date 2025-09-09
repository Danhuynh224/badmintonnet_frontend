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
  Calendar,
  MapPin,
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

type Event = {
  id: string;
  name: string;
  clubName: string;
  location: string;
  startDate: string;
  endDate: string;
  participantCount: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
};

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dữ liệu mẫu
  const events: Event[] = [
    {
      id: '1',
      name: 'Giải cầu lông mở rộng Hà Nội 2023',
      clubName: 'Câu lạc bộ Cầu lông Hà Nội',
      location: 'Nhà thi đấu Bách Khoa, Hà Nội',
      startDate: '2023-06-15',
      endDate: '2023-06-18',
      participantCount: 120,
      status: 'completed',
    },
    {
      id: '2',
      name: 'Giải bóng bàn sinh viên TP.HCM',
      clubName: 'Câu lạc bộ Bóng bàn Sài Gòn',
      location: 'Nhà thi đấu Phú Thọ, TP.HCM',
      startDate: '2023-07-20',
      endDate: '2023-07-22',
      participantCount: 85,
      status: 'completed',
    },
    {
      id: '3',
      name: 'Giải Tennis mùa hè Đà Nẵng',
      clubName: 'Câu lạc bộ Tennis Đà Nẵng',
      location: 'Sân Tennis Thanh Khê, Đà Nẵng',
      startDate: '2023-08-10',
      endDate: '2023-08-12',
      participantCount: 64,
      status: 'completed',
    },
    {
      id: '4',
      name: 'Giải bóng đá giao hữu Cần Thơ',
      clubName: 'Câu lạc bộ Bóng đá Cần Thơ',
      location: 'Sân vận động Cần Thơ',
      startDate: '2023-11-05',
      endDate: '2023-11-07',
      participantCount: 150,
      status: 'ongoing',
    },
    {
      id: '5',
      name: 'Giải bơi lội mở rộng Huế',
      clubName: 'Câu lạc bộ Bơi lội Huế',
      location: 'Hồ bơi Thừa Thiên Huế',
      startDate: '2023-12-12',
      endDate: '2023-12-14',
      participantCount: 45,
      status: 'upcoming',
    },
    {
      id: '6',
      name: 'Giải cầu lông đôi nam nữ',
      clubName: 'Câu lạc bộ Cầu lông Hà Nội',
      location: 'Nhà thi đấu Bách Khoa, Hà Nội',
      startDate: '2023-10-15',
      endDate: '2023-10-16',
      participantCount: 32,
      status: 'cancelled',
    },
  ];

  // Lọc sự kiện dựa trên các bộ lọc
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || event.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Hiển thị badge trạng thái
  const getStatusBadge = (status: Event['status']) => {
    switch (status) {
      case 'upcoming':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Sắp diễn ra
          </Badge>
        );
      case 'ongoing':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Đang diễn ra
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
            Đã kết thúc
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            Đã hủy
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
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Quản lý sự kiện</h1>
          <p className="text-muted-foreground text-gray-500 dark:text-gray-400">Quản lý tất cả sự kiện trong hệ thống</p>
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
          <CardTitle>Danh sách sự kiện</CardTitle>
          <CardDescription>Tổng cộng {events.length} sự kiện trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo tên, câu lạc bộ, địa điểm..."
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
                    <SelectItem value="upcoming">Sắp diễn ra</SelectItem>
                    <SelectItem value="ongoing">Đang diễn ra</SelectItem>
                    <SelectItem value="completed">Đã kết thúc</SelectItem>
                    <SelectItem value="cancelled">Đã hủy</SelectItem>
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
                  <TableHead>Tên sự kiện</TableHead>
                  <TableHead>Câu lạc bộ</TableHead>
                  <TableHead>Địa điểm</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Số người tham gia</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell>{event.clubName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="truncate max-w-[150px]">{event.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>
                          {new Date(event.startDate).toLocaleDateString('vi-VN')} - {new Date(event.endDate).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{event.participantCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(event.status)}</TableCell>
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
                          {event.status !== 'cancelled' && event.status !== 'completed' && (
                            <DropdownMenuItem className="cursor-pointer text-orange-600">
                              <XCircle className="h-4 w-4 mr-2" />
                              Hủy sự kiện
                            </DropdownMenuItem>
                          )}
                          {event.status === 'cancelled' && (
                            <DropdownMenuItem className="cursor-pointer text-green-600">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Khôi phục
                            </DropdownMenuItem>
                          )}
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