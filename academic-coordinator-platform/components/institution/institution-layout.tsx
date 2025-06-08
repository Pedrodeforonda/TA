"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  BarChart3,
  Settings,
  Users,
  LogOut,
  Plus,
  Eye,
  Mail,
  Shield,
  Search,
  Bell,
  User,
  GraduationCap,
  Upload,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Notifications, type Notification } from "../ui/notifications"
import { SubjectDetailPage } from "../subjects/subject-detail-page"
import { LowAttendancePage } from "../metrics/low-attendance-page"
import { StudentsAtRiskPage } from "../metrics/students-at-risk-page"
import { ProfessorInvitationsPage } from "../invitations/professor-invitations-page"
import { StudentInvitationsPage } from "../invitations/student-invitations-page"
import { AttendanceBySubjectChart } from "../charts/attendance-by-subject-chart"
import { AttendanceDistributionChart } from "../charts/attendance-distribution-chart"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface InstitutionLayoutProps {
  institutionName: string
  onLogout: () => void
  onCreateSubject: () => void
}

export function InstitutionLayout({ institutionName, onLogout, onCreateSubject }: InstitutionLayoutProps) {
  const [activeTab, setActiveTab] = useState("materias")
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [selectedSubject, setSelectedSubject] = useState<any>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [notificationCount, setNotificationCount] = useState(3)
  const [searchTerm, setSearchTerm] = useState("")
  const [professorEmail, setProfessorEmail] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [participantFilter, setParticipantFilter] = useState("todos")
  const [participantSearch, setParticipantSearch] = useState("")

  // Mock data
  const subjects = [
    {
      id: 1,
      name: "Introducción a la Ingeniería",
      days: ["Lunes", "Miércoles"],
      startTime: "14:00",
      endTime: "16:00",
      professor: "Dr. Juan Pérez",
      students: 25,
      attendance: 85,
    },
    {
      id: 2,
      name: "Álgebra I",
      days: ["Martes", "Jueves"],
      startTime: "10:00",
      endTime: "12:00",
      professor: "Dra. María García",
      students: 30,
      attendance: 92,
    },
    {
      id: 3,
      name: "Física I",
      days: ["Miércoles", "Viernes"],
      startTime: "16:00",
      endTime: "18:00",
      professor: "Dr. Carlos López",
      students: 28,
      attendance: 78,
    },
  ]

  // Mock data para participantes
  const participants = [
    { id: 1, name: "Juan Pérez", email: "juan.perez@universidad.edu", role: "profesor", department: "Ingeniería" },
    { id: 2, name: "María García", email: "maria.garcia@universidad.edu", role: "profesor", department: "Matemáticas" },
    { id: 3, name: "Carlos López", email: "carlos.lopez@universidad.edu", role: "profesor", department: "Física" },
    {
      id: 4,
      name: "Ana Martínez",
      email: "ana.martinez@mail.com",
      role: "estudiante",
      career: "Ingeniería Informática",
    },
    {
      id: 5,
      name: "Pedro Rodríguez",
      email: "pedro.rodriguez@mail.com",
      role: "estudiante",
      career: "Ingeniería Civil",
    },
    { id: 6, name: "Sofía López", email: "sofia.lopez@mail.com", role: "estudiante", career: "Matemáticas" },
    { id: 7, name: "Diego Fernández", email: "diego.fernandez@mail.com", role: "estudiante", career: "Física" },
    { id: 8, name: "Carmen Ruiz", email: "carmen.ruiz@mail.com", role: "estudiante", career: "Química" },
    { id: 9, name: "Roberto Silva", email: "roberto.silva@universidad.edu", role: "profesor", department: "Química" },
    {
      id: 10,
      name: "Elena Gómez",
      email: "elena.gomez@mail.com",
      role: "estudiante",
      career: "Ingeniería Informática",
    },
  ]

  const filteredParticipants = participants.filter((participant) => {
    const matchesFilter = participantFilter === "todos" || participant.role === participantFilter
    const matchesSearch =
      participant.name.toLowerCase().includes(participantSearch.toLowerCase()) ||
      participant.email.toLowerCase().includes(participantSearch.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
    setNotificationCount(Math.max(0, notificationCount - 1))
  }

  const addNotification = (title: string, message: string, type: "success" | "error" | "info" | "warning") => {
    const id = Date.now().toString()
    const newNotification: Notification = {
      id,
      title,
      message,
      type,
      duration: 5000,
    }
    setNotifications([...notifications, newNotification])

    setTimeout(() => {
      dismissNotification(id)
    }, newNotification.duration)
  }

  const handleProfessorInvite = () => {
    if (professorEmail.trim()) {
      addNotification("Invitación enviada", `Se ha enviado una invitación a ${professorEmail}`, "success")
      setProfessorEmail("")
    }
  }

  const handleStudentInvite = () => {
    if (studentEmail.trim()) {
      addNotification("Invitación enviada", `Se ha enviado una invitación a ${studentEmail}`, "success")
      setStudentEmail("")
    }
  }

  const handleCSVUpload = (type: "professor" | "student") => {
    // Crear un input file temporal
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".csv"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        addNotification(
          "CSV procesado",
          `Se han enviado invitaciones masivas a ${type === "professor" ? "profesores" : "estudiantes"} desde el archivo ${file.name}`,
          "success",
        )
      }
    }
    input.click()
  }

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.professor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notifications */}
      <Notifications notifications={notifications} onDismiss={dismissNotification} />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">{institutionName}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setNotificationCount(notificationCount > 0 ? notificationCount - 1 : 0)}
              className="flex items-center space-x-2"
            >
              <Bell className="h-4 w-4" />
              <span>Notificaciones</span>
              {notificationCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Ver como Estudiante
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Fixed Tabs - Always visible */}
        <div className="mt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="materias" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Materias</span>
              </TabsTrigger>
              <TabsTrigger value="metricas" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Métricas</span>
              </TabsTrigger>
              <TabsTrigger value="participantes" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Participantes</span>
              </TabsTrigger>
              <TabsTrigger value="ajustes" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Ajustes</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Render different pages based on currentPage state */}
        {currentPage === "subject-detail" && selectedSubject && (
          <SubjectDetailPage subject={selectedSubject} onBack={() => setCurrentPage("dashboard")} />
        )}

        {currentPage === "low-attendance" && <LowAttendancePage onBack={() => setCurrentPage("dashboard")} />}

        {currentPage === "students-at-risk" && <StudentsAtRiskPage onBack={() => setCurrentPage("dashboard")} />}

        {currentPage === "professor-invitations" && (
          <ProfessorInvitationsPage onBack={() => setCurrentPage("dashboard")} />
        )}

        {currentPage === "student-invitations" && <StudentInvitationsPage onBack={() => setCurrentPage("dashboard")} />}

        {/* Dashboard principal */}
        {currentPage === "dashboard" && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Materias Tab */}
            <TabsContent value="materias" className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar materias o profesores..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={onCreateSubject}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Materia
                </Button>
              </div>

              <div className="grid gap-4">
                {filteredSubjects.map((subject) => (
                  <Card key={subject.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{subject.name}</h3>
                          <p className="text-gray-600">Profesor: {subject.professor}</p>
                          <p className="text-sm text-gray-500">
                            {subject.days.join(", ")} • {subject.startTime} - {subject.endTime}
                          </p>
                          <p className="text-sm text-gray-500">{subject.students} estudiantes</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{subject.attendance}%</div>
                          <p className="text-sm text-gray-500">Asistencia promedio</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Métricas Tab */}
            <TabsContent value="metricas" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Asistencia Promedio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <p className="text-xs text-gray-500">Todas las materias</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Clases con Baja Participación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">4</div>
                    <p className="text-xs text-gray-500">{"<60% asistencia"}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2"
                      onClick={() => setCurrentPage("low-attendance")}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Estudiantes en Riesgo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">5</div>
                    <p className="text-xs text-gray-500">{"<75% asistencia"}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2"
                      onClick={() => setCurrentPage("students-at-risk")}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Section */}
              <div className="space-y-6">
                <AttendanceBySubjectChart />
                <AttendanceDistributionChart />
              </div>
            </TabsContent>

            {/* Participantes Tab */}
            <TabsContent value="participantes" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Invitar Profesores</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Email del profesor</label>
                      <Input
                        type="email"
                        placeholder="profesor@ejemplo.com"
                        value={professorEmail}
                        onChange={(e) => setProfessorEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={handleProfessorInvite}>
                        <Mail className="h-4 w-4 mr-2" />
                        Invitar Profesor
                      </Button>
                      <Button variant="outline" onClick={() => handleCSVUpload("professor")}>
                        <Upload className="h-4 w-4 mr-2" />
                        Invitar profesores mediante CSV
                      </Button>
                      <Button variant="outline" onClick={() => setCurrentPage("professor-invitations")}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Invitaciones
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Invitar Estudiantes</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">Email del estudiante</label>
                      <Input
                        type="email"
                        placeholder="estudiante@ejemplo.com"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={handleStudentInvite}>
                        <Mail className="h-4 w-4 mr-2" />
                        Invitar Estudiante
                      </Button>
                      <Button variant="outline" onClick={() => handleCSVUpload("student")}>
                        <Upload className="h-4 w-4 mr-2" />
                        Invitar estudiantes mediante CSV
                      </Button>
                      <Button variant="outline" onClick={() => setCurrentPage("student-invitations")}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Invitaciones
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Participantes de la Institución</CardTitle>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Buscar por nombre o email..."
                        value={participantSearch}
                        onChange={(e) => setParticipantSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={participantFilter} onValueChange={setParticipantFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Filtrar por rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="profesor">Profesores</SelectItem>
                        <SelectItem value="estudiante">Estudiantes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Departamento/Carrera</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredParticipants.map((participant) => (
                        <TableRow key={participant.id}>
                          <TableCell className="font-medium">{participant.name}</TableCell>
                          <TableCell>{participant.email}</TableCell>
                          <TableCell>
                            {participant.role === "profesor" ? (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                <User className="h-3 w-3 mr-1" />
                                Profesor
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                <GraduationCap className="h-3 w-3 mr-1" />
                                Estudiante
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {participant.role === "profesor" ? participant.department : participant.career}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 text-center text-sm text-gray-500">
                    Mostrando {filteredParticipants.length} de {participants.length} participantes
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Ajustes Tab */}
            <TabsContent value="ajustes" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Permisos de Profesores</span>
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Configura los permisos que tienen los profesores para gestionar materias
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Gestionar profesores</p>
                          <p className="text-sm text-gray-600">Permite agregar/remover profesores de materias</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Gestionar estudiantes</p>
                          <p className="text-sm text-gray-600">Permite agregar/remover estudiantes de materias</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Gestionar excepciones</p>
                          <p className="text-sm text-gray-600">Permite gestionar excepciones de asistencia</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Umbral de Asistencia para Regularidad (%)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select defaultValue="75">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar umbral" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="65">65%</SelectItem>
                        <SelectItem value="70">70%</SelectItem>
                        <SelectItem value="75">75%</SelectItem>
                        <SelectItem value="80">80%</SelectItem>
                        <SelectItem value="85">85%</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  )
}
