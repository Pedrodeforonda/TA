"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Mail, Phone, Calendar } from "lucide-react"

interface StudentsAtRiskPageProps {
  onBack: () => void
}

export function StudentsAtRiskPage({ onBack }: StudentsAtRiskPageProps) {
  const studentsAtRisk = [
    {
      name: "Ana Martínez",
      email: "ana.martinez@mail.com",
      phone: "+54 11 1234-5678",
      subjects: [
        { name: "Física I", attendance: 65, missedClasses: 8, totalClasses: 23 },
        { name: "Química General", attendance: 70, missedClasses: 6, totalClasses: 20 },
      ],
      overallAttendance: 67,
      riskLevel: "Alto",
      lastContact: "2024-01-10",
    },
    {
      name: "Pedro Rodríguez",
      email: "pedro.rodriguez@mail.com",
      phone: "+54 11 8765-4321",
      subjects: [
        { name: "Álgebra I", attendance: 70, missedClasses: 7, totalClasses: 24 },
        { name: "Programación I", attendance: 72, missedClasses: 6, totalClasses: 22 },
      ],
      overallAttendance: 71,
      riskLevel: "Medio",
      lastContact: "2024-01-08",
    },
    {
      name: "Sofía López",
      email: "sofia.lopez@mail.com",
      phone: "+54 11 5555-1234",
      subjects: [
        { name: "Química General", attendance: 68, missedClasses: 7, totalClasses: 22 },
        { name: "Matemática II", attendance: 74, missedClasses: 5, totalClasses: 20 },
      ],
      overallAttendance: 71,
      riskLevel: "Medio",
      lastContact: "2024-01-12",
    },
    {
      name: "Diego Fernández",
      email: "diego.fernandez@mail.com",
      phone: "+54 11 9999-8888",
      subjects: [{ name: "Matemática II", attendance: 72, missedClasses: 6, totalClasses: 21 }],
      overallAttendance: 72,
      riskLevel: "Medio",
      lastContact: "2024-01-05",
    },
  ]

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "Alto":
        return <Badge variant="destructive">Alto Riesgo</Badge>
      case "Medio":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Riesgo Medio
          </Badge>
        )
      default:
        return <Badge variant="secondary">Bajo Riesgo</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            <span>Estudiantes en Riesgo</span>
          </h1>
          <p className="text-gray-600">Estudiantes con menos del 75% de asistencia</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          ← Volver
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">2</div>
            <p className="text-sm text-gray-600">Alto Riesgo (&lt;70%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">3</div>
            <p className="text-sm text-gray-600">Riesgo Medio (70-74%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <p className="text-sm text-gray-600">Total Estudiantes</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista Detallada de Estudiantes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estudiante</TableHead>
                <TableHead>Asistencia General</TableHead>
                <TableHead>Nivel de Riesgo</TableHead>
                <TableHead>Último Contacto</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentsAtRisk.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm font-medium">{student.overallAttendance}%</div>
                      <div className="h-2 w-16 bg-red-200 rounded-full">
                        <div
                          className="h-2 bg-red-500 rounded-full"
                          style={{ width: `${student.overallAttendance}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRiskBadge(student.riskLevel)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{student.lastContact}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-1" />
                        Llamar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studentsAtRisk.slice(0, 2).map((student, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{student.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Asistencia General:</span>
                  <Badge variant={student.overallAttendance < 70 ? "destructive" : "secondary"}>
                    {student.overallAttendance}%
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Materias:</p>
                  {student.subjects.map((subject, i) => (
                    <div key={i} className="flex items-center justify-between text-sm mb-1">
                      <span>{subject.name}</span>
                      <span className="text-gray-600">
                        {subject.attendance}% ({subject.missedClasses}/{subject.totalClasses} faltas)
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t">
                  <Button size="sm" className="w-full">
                    Contactar Estudiante
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
