"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LowAttendancePageProps {
  onBack: () => void
}

export function LowAttendancePage({ onBack }: LowAttendancePageProps) {
  const lowAttendanceSubjects = [
    {
      subject: "Física I",
      professor: "Dr. Carlos López",
      attendance: 45,
    },
    {
      subject: "Química General",
      professor: "Dra. Ana Martínez",
      attendance: 52,
    },
    {
      subject: "Matemática II",
      professor: "Dr. Roberto Silva",
      attendance: 38,
    },
    {
      subject: "Programación I",
      professor: "Ing. Laura Pérez",
      attendance: 55,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Materias con Baja Participación</h1>
          <p className="text-gray-600">Materias con menos del 60% de asistencia</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          ← Volver
        </Button>
      </div>

      <div className="grid gap-4">
        {lowAttendanceSubjects.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{item.subject}</h3>
                  <div className="text-sm text-gray-600">
                    <span>Prof. {item.professor}</span>
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
