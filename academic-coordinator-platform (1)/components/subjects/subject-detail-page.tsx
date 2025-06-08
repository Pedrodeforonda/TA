"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { X, Plus, BarChart3, Calendar, CheckCircle, XCircle } from "lucide-react"

interface SubjectDetailPageProps {
  subject: any
  onBack: () => void
}

export function SubjectDetailPage({ subject, onBack }: SubjectDetailPageProps) {
  const [professors] = useState([
    { id: 1, name: "Dr. Juan Pérez", email: "juan.perez@universidad.edu", phone: "+54 11 1234-5678" },
    { id: 2, name: "Dra. María García", email: "maria.garcia@universidad.edu", phone: "+54 11 8765-4321" },
  ])

  const [students] = useState([
    { id: 1, name: "Ana García", email: "ana.garcia@mail.com", attendance: 95, status: "Regular" },
    { id: 2, name: "Carlos López", email: "carlos.lopez@mail.com", attendance: 78, status: "Regular" },
    { id: 3, name: "María Rodríguez", email: "maria.rodriguez@mail.com", attendance: 65, status: "En Riesgo" },
    { id: 4, name: "Pedro Martínez", email: "pedro.martinez@mail.com", attendance: 88, status: "Regular" },
    { id: 5, name: "Sofía López", email: "sofia.lopez@mail.com", attendance: 92, status: "Regular" },
    { id: 6, name: "Diego Fernández", email: "diego.fernandez@mail.com", attendance: 72, status: "En Riesgo" },
  ])

  const [attendanceHistory] = useState([
    {
      date: "2024-01-15",
      topic: "Introducción a los algoritmos",
      totalStudents: 25,
      presentStudents: 23,
      percentage: 92,
      attendees: ["Ana García", "Carlos López", "Pedro Martínez", "Sofía López"],
      absent: ["María Rodríguez", "Diego Fernández"],
    },
    {
      date: "2024-01-08",
      topic: "Fundamentos de programación",
      totalStudents: 25,
      presentStudents: 20,
      percentage: 80,
      attendees: ["Ana García", "María Rodríguez", "Pedro Martínez", "Sofía López"],
      absent: ["Carlos López", "Diego Fernández"],
    },
    {
      date: "2024-01-01",
      topic: "Historia de la computación",
      totalStudents: 25,
      presentStudents: 18,
      percentage: 72,
      attendees: ["Ana García", "Carlos López", "Sofía López"],
      absent: ["María Rodríguez", "Pedro Martínez", "Diego Fernández"],
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{subject.name}</h1>
          <p className="text-sm text-gray-600">
            {Array.isArray(subject.days) ? subject.days.join(", ") : subject.day} • {subject.startTime} -{" "}
            {subject.endTime}
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          ← Volver
        </Button>
      </div>

      <Tabs defaultValue="professors" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="professors">Profesores</TabsTrigger>
          <TabsTrigger value="students">Estudiantes</TabsTrigger>
          <TabsTrigger value="attendance">Historial de Asistencias</TabsTrigger>
        </TabsList>

        <TabsContent value="professors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Profesores Asignados</span>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Profesor
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {professors.map((professor) => (
                  <div key={professor.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold">{professor.name}</h3>
                      <p className="text-sm text-gray-600">{professor.email}</p>
                      <p className="text-sm text-gray-600">{professor.phone}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">Activo</Badge>
                      <Button variant="ghost" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Estudiantes Inscriptos ({students.length})</span>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Estudiante
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Asistencia</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="text-sm font-medium">{student.attendance}%</div>
                          <div
                            className={`h-2 w-16 rounded-full ${
                              student.attendance >= 75 ? "bg-green-200" : "bg-red-200"
                            }`}
                          >
                            <div
                              className={`h-2 rounded-full ${student.attendance >= 75 ? "bg-green-500" : "bg-red-500"}`}
                              style={{ width: `${student.attendance}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={student.status === "En Riesgo" ? "destructive" : "secondary"}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Historial de Asistencias</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceHistory.map((session, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{session.topic}</h3>
                        <p className="text-sm text-gray-600">{session.date}</p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${
                            session.percentage >= 80 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {session.percentage}%
                        </div>
                        <p className="text-sm text-gray-500">
                          {session.presentStudents}/{session.totalStudents} presentes
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-green-700 mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Presentes ({session.attendees.length})
                        </h4>
                        <div className="space-y-1">
                          {session.attendees.slice(0, 3).map((name, i) => (
                            <p key={i} className="text-sm text-gray-600">
                              {name}
                            </p>
                          ))}
                          {session.attendees.length > 3 && (
                            <p className="text-sm text-gray-500">+{session.attendees.length - 3} más</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-red-700 mb-2 flex items-center">
                          <XCircle className="h-4 w-4 mr-1" />
                          Ausentes ({session.absent.length})
                        </h4>
                        <div className="space-y-1">
                          {session.absent.map((name, i) => (
                            <p key={i} className="text-sm text-gray-600">
                              {name}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
