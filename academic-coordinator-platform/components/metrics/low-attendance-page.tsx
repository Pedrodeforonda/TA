"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users } from "lucide-react"

interface LowAttendancePageProps {
  onBack: () => void
}

export function LowAttendancePage({ onBack }: LowAttendancePageProps) {
  const lowAttendanceClasses = [
    {
      subject: "Física I",
      date: "2024-01-15",
      professor: "Dr. Carlos López",
      attendance: 45,
      totalStudents: 28,
      presentStudents: 13,
    },
    {
      subject: "Química General",
      date: "2024-01-14",
      professor: "Dra. Ana Martínez",
      attendance: 52,
      totalStudents: 25,
      presentStudents: 13,
    },
    {
      subject: "Matemática II",
      date: "2024-01-13",
      professor: "Dr. Roberto Silva",
      attendance: 38,
      totalStudents: 30,
      presentStudents: 11,
    },
    {
      subject: "Programación I",
      date: "2024-01-12",
      professor: "Ing. Laura Pérez",
      attendance: 55,
      totalStudents: 32,
      presentStudents: 18,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clases con Baja Participación</h1>
          <p className="text-gray-600">Clases con menos del 60% de asistencia</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          ← Volver
        </Button>
      </div>

      <div className="grid gap-4">
        {lowAttendanceClasses.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{item.subject}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{item.date}</span>
                    </div>
                    <span>Prof. {item.professor}</span>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>
                        {item.presentStudents}/{item.totalStudents}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant="destructive" className="text-lg px-3 py-1">
                  {item.attendance}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
