"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Mail, X, User, Calendar, BookOpen, AlertTriangle } from "lucide-react"

interface StudentProfilePageProps {
  student: any
  onBack: () => void
}

export function StudentProfilePage({ student, onBack }: StudentProfilePageProps) {
  // Datos de ejemplo para las materias del estudiante
  const studentSubjects = [
    {
      name: "Física I",
      attendance: 67,
      absences: 8,
      status: "Libre",
      professor: "Dr. Carlos López",
      riskLevel: "alto",
    },
    {
      name: "Álgebra I",
      attendance: 85,
      absences: 3,
      status: "Regular",
      professor: "Dra. María García",
      riskLevel: "bajo",
    },
    {
      name: "Química General",
      attendance: 72,
      absences: 6,
      status: "Regular",
      professor: "Dr. Roberto Silva",
      riskLevel: "medio",
    },
    {
      name: "Programación I",
      attendance: 90,
      absences: 2,
      status: "Regular",
      professor: "Ing. Laura Pérez",
      riskLevel: "bajo",
    },
    {
      name: "Matemática II",
      attendance: 58,
      absences: 12,
      status: "Libre",
      professor: "Dr. Juan Pérez",
      riskLevel: "alto",
    },
  ]

  const handleNotify = (subjectName: string) => {
    alert(`Notificación enviada a ${student.name} sobre la materia ${subjectName}`)
  }

  const getOverallRisk = () => {
    const highRiskCount = studentSubjects.filter((s) => s.riskLevel === "alto").length
    const mediumRiskCount = studentSubjects.filter((s) => s.riskLevel === "medio").length

    if (highRiskCount >= 2) return "alto"
    if (highRiskCount >= 1 || mediumRiskCount >= 2) return "medio"
    return "bajo"
  }

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "alto":
        return <Badge variant="destructive">Alto Riesgo</Badge>
      case "medio":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Riesgo Medio
          </Badge>
        )
      case "bajo":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Bajo Riesgo
          </Badge>
        )
      default:
        return null
    }
  }

  const overallAttendance = Math.round(
    studentSubjects.reduce((acc, subject) => acc + subject.attendance, 0) / studentSubjects.length,
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex items-center space-x-3">
                <div>
                  <CardTitle className="text-2xl">{student.name}</CardTitle>
                  <p className="text-gray-600">{student.email}</p>
                </div>
                {getRiskBadge(getOverallRisk())}
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onBack}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Fecha de ingreso</p>
                <p className="font-medium">01/03/2023</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <BookOpen className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Materias cursando</p>
                <p className="font-medium">{studentSubjects.length}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Asistencia general</p>
                <p className="font-medium">{overallAttendance}%</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Notificaciones enviadas</p>
                <p className="font-medium">3</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-4">Materias y Asistencia</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Materia</TableHead>
                  <TableHead>Profesor</TableHead>
                  <TableHead>Asistencia Promedio</TableHead>
                  <TableHead>Faltas</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentSubjects.map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{subject.name}</TableCell>
                    <TableCell>{subject.professor}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm font-medium">{subject.attendance}%</div>
                        <div
                          className={`h-2 w-16 rounded-full ${
                            subject.attendance >= 75 ? "bg-green-200" : "bg-red-200"
                          }`}
                        >
                          <div
                            className={`h-2 rounded-full ${subject.attendance >= 75 ? "bg-green-500" : "bg-red-500"}`}
                            style={{ width: `${subject.attendance}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-red-600">{subject.absences}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={subject.status === "Libre" ? "destructive" : "secondary"}>{subject.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => handleNotify(subject.name)}>
                        <Mail className="h-4 w-4 mr-1" />
                        Notificar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
