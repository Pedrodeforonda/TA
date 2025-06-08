"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface StudentsAtRiskPageProps {
  onBack: () => void
}

export function StudentsAtRiskPage({ onBack }: StudentsAtRiskPageProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const studentsAtRisk = [
    {
      name: "Ana Martínez",
      email: "ana.martinez@mail.com",
      subject: "Física I",
      overallAttendance: 67,
      absences: 8,
    },
    {
      name: "Pedro Rodríguez",
      email: "pedro.rodriguez@mail.com",
      subject: "Álgebra I",
      overallAttendance: 71,
      absences: 7,
    },
    {
      name: "Sofía López",
      email: "sofia.lopez@mail.com",
      subject: "Química General",
      overallAttendance: 71,
      absences: 6,
    },
    {
      name: "Diego Fernández",
      email: "diego.fernandez@mail.com",
      subject: "Matemática II",
      overallAttendance: 72,
      absences: 3,
    },
    {
      name: "Carmen Ruiz",
      email: "carmen.ruiz@mail.com",
      subject: "Programación I",
      overallAttendance: 65,
      absences: 9,
    },
  ]

  const filteredStudents = studentsAtRisk.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.subject.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleNotify = (studentName: string, email: string) => {
    // Aquí iría la lógica para enviar el email automático
    alert(`Notificación enviada a ${studentName} (${email})`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Estudiantes en Riesgo</h1>
          <p className="text-gray-600">Estudiantes con menos del 75% de asistencia</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          ← Volver
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista Detallada de Estudiantes</CardTitle>
          <div className="flex items-center space-x-4 mt-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar estudiantes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estudiante</TableHead>
                <TableHead>Materia</TableHead>
                <TableHead>Asistencia</TableHead>
                <TableHead>Faltas</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{student.subject}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium">{student.overallAttendance}%</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-red-600">{student.absences}</span>
                  </TableCell>
                  <TableCell>
                    {student.absences >= 4 ? (
                      <Badge variant="destructive">Libre</Badge>
                    ) : (
                      <Badge variant="secondary">Regular</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => handleNotify(student.name, student.email)}>
                      <Mail className="h-4 w-4 mr-1" />
                      Notificar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
