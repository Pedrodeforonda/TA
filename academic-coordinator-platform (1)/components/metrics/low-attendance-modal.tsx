"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Calendar, Users } from "lucide-react"

interface LowAttendanceModalProps {
  onClose: () => void
}

export function LowAttendanceModal({ onClose }: LowAttendanceModalProps) {
  const lowAttendanceClasses = [
    { subject: "Física I", date: "2024-01-15", attendance: 45, totalStudents: 28, presentStudents: 13 },
    { subject: "Química General", date: "2024-01-14", attendance: 52, totalStudents: 25, presentStudents: 13 },
    { subject: "Matemática II", date: "2024-01-13", attendance: 38, totalStudents: 30, presentStudents: 11 },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-red-600" />
              <span>Clases con Baja Participación</span>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lowAttendanceClasses.map((item, index) => (
              <div key={index} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{item.subject}</h3>
                  <Badge variant="destructive">{item.attendance}%</Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>
                      {item.presentStudents}/{item.totalStudents} presentes
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
