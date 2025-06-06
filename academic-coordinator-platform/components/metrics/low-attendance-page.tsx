"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, AlertTriangle } from "lucide-react"

interface LowAttendancePageProps {
  onBack: () => void
}

export function LowAttendancePage({ onBack }: LowAttendancePageProps) {
  const lowAttendanceClasses = [
    {
      subject: "Física I",
      date: "2024-01-15",
      topic: "Cinemática y Dinámica",
      attendance: 45,
      totalStudents: 28,
      presentStudents: 13,
      professor: "Dr. Carlos López",
      reason: "Día lluvioso",
    },
    {
      subject: "Química General",
      date: "2024-01-14",
      topic: "Tabla Periódica",
      attendance: 52,
      totalStudents: 25,
      presentStudents: 13,
      professor: "Dra. Ana Martínez",
      reason: "Examen en otra materia",
    },
    {
      subject: "Matemática II",
      date: "2024-01-13",
      topic: "Integrales Definidas",
      attendance: 38,
      totalStudents: 30,
      presentStudents: 11,
      professor: "Dr. Roberto Silva",
      reason: "Feriado puente",
    },
    {
      subject: "Programación I",
      date: "2024-01-12",
      topic: "Estructuras de Control",
      attendance: 55,
      totalStudents: 32,
      presentStudents: 18,
      professor: "Ing. Laura Pérez",
      reason: "Problemas de transporte",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <span>Clases con Baja Participación</span>
          </h1>
          <p className="text-gray-600">Clases con menos del 60% de asistencia</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          ← Volver
        </Button>
      </div>

      <div className="grid gap-4">
        {lowAttendanceClasses.map((item, index) => (
          <Card key={index} className="border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-red-700">{item.subject}</h3>
                  <p className="text-gray-600">{item.topic}</p>
                  <p className="text-sm text-gray-500">Profesor: {item.professor}</p>
                </div>
                <Badge variant="destructive" className="text-lg px-3 py-1">
                  {item.attendance}%
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{item.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    {item.presentStudents}/{item.totalStudents} presentes
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">{item.reason}</span>
                </div>
              </div>

              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm text-red-700">
                  <strong>Recomendación:</strong> Contactar a los estudiantes ausentes y considerar reprogramar el tema
                  si es necesario.
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumen de Acciones Recomendadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span className="text-sm">Enviar recordatorios por email antes de las clases con temas importantes</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm">Considerar clases de recuperación para temas con baja asistencia</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Calendar className="h-5 w-5 text-green-600" />
              <span className="text-sm">Revisar el calendario académico para evitar conflictos</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
