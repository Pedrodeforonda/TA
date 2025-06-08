"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { X, Plus, BarChart3, Users, UserCheck } from "lucide-react"

interface SubjectDetailModalProps {
  subject: any
  onClose: () => void
}

export function SubjectDetailModal({ subject, onClose }: SubjectDetailModalProps) {
  const [professors, setProfessors] = useState(["Dr. Juan Pérez"])
  const [students, setStudents] = useState([
    { name: "Ana García", attendance: 95, status: "Regular" },
    { name: "Carlos López", attendance: 78, status: "Regular" },
    { name: "María Rodríguez", attendance: 65, status: "En Riesgo" },
  ])
  const [newProfessor, setNewProfessor] = useState("")
  const [newStudent, setNewStudent] = useState("")

  const addProfessor = () => {
    if (newProfessor.trim()) {
      setProfessors([...professors, newProfessor.trim()])
      setNewProfessor("")
    }
  }

  const removeProfessor = (index: number) => {
    setProfessors(professors.filter((_, i) => i !== index))
  }

  const addStudent = () => {
    if (newStudent.trim()) {
      setStudents([...students, { name: newStudent.trim(), attendance: 100, status: "Regular" }])
      setNewStudent("")
    }
  }

  const removeStudent = (index: number) => {
    setStudents(students.filter((_, i) => i !== index))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{subject.name}</CardTitle>
              <p className="text-sm text-gray-600">
                {subject.day} • {subject.startTime} - {subject.endTime}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="professors" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="professors">Profesores</TabsTrigger>
              <TabsTrigger value="students">Alumnos</TabsTrigger>
              <TabsTrigger value="metrics">Métricas</TabsTrigger>
            </TabsList>

            <TabsContent value="professors" className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newProfessor}
                  onChange={(e) => setNewProfessor(e.target.value)}
                  placeholder="Nombre del profesor"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addProfessor())}
                />
                <Button onClick={addProfessor}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
              <div className="space-y-2">
                {professors.map((professor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{professor}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeProfessor(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newStudent}
                  onChange={(e) => setNewStudent(e.target.value)}
                  placeholder="Nombre del alumno"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addStudent())}
                />
                <Button onClick={addStudent}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
              <div className="space-y-2">
                {students.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{student.name}</span>
                      <Badge variant={student.status === "En Riesgo" ? "destructive" : "secondary"}>
                        {student.attendance}% asistencia
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => removeStudent(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Total Alumnos</p>
                        <p className="text-2xl font-bold">{students.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <UserCheck className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Asistencia Promedio</p>
                        <p className="text-2xl font-bold text-green-600">{subject.attendance}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium">En Riesgo</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {students.filter((s) => s.status === "En Riesgo").length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
