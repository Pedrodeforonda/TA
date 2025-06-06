"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, BarChart3, Settings, Users, LogOut, Plus, Download, Eye, Mail, Shield, UserPlus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Notifications, NotificationBell, type Notification } from "../ui/notifications"
import { SubjectDetailPage } from "../subjects/subject-detail-page"
import { LowAttendancePage } from "../metrics/low-attendance-page"
import { StudentsAtRiskPage } from "../metrics/students-at-risk-page"

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

  const handleInvite = (email: string) => {
    addNotification("Invitación enviada", `Se ha enviado una invitación a ${email}`, "success")
    setCurrentPage("dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notifications */}
      <Notifications notifications={notifications} onDismiss={dismissNotification} />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Plataforma Educativa</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setNotificationCount(notificationCount > 0 ? notificationCount - 1 : 0)}
            >
              <NotificationBell count={notificationCount} />
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
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{institutionName}</h1>
        </div>

        {/* Render different pages based on currentPage state */}
        {currentPage === "subject-detail" && selectedSubject && (
          <SubjectDetailPage subject={selectedSubject} onBack={() => setCurrentPage("dashboard")} />
        )}

        {currentPage === "low-attendance" && <LowAttendancePage onBack={() => setCurrentPage("dashboard")} />}

        {currentPage === "students-at-risk" && <StudentsAtRiskPage onBack={() => setCurrentPage("dashboard")} />}

        {currentPage === "invite-professor" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Invitar Profesor</h1>
              <Button variant="outline" onClick={() => setCurrentPage("dashboard")}>
                ← Volver
              </Button>
            </div>
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>Enviar Invitación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email del profesor</label>
                    <input type="email" className="w-full p-2 border rounded-md" placeholder="profesor@ejemplo.com" />
                  </div>
                  <Button
                    onClick={() => {
                      addNotification("Invitación enviada", "Se ha enviado la invitación al profesor", "success")
                      setCurrentPage("dashboard")
                    }}
                  >
                    Enviar Invitación
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentPage === "invite-student" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Invitar Alumno</h1>
              <Button variant="outline" onClick={() => setCurrentPage("dashboard")}>
                ← Volver
              </Button>
            </div>
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>Enviar Invitación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email del alumno</label>
                    <input type="email" className="w-full p-2 border rounded-md" placeholder="alumno@ejemplo.com" />
                  </div>
                  <Button
                    onClick={() => {
                      addNotification("Invitación enviada", "Se ha enviado la invitación al alumno", "success")
                      setCurrentPage("dashboard")
                    }}
                  >
                    Enviar Invitación
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentPage === "professor-invitations" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Invitaciones de Profesores</h1>
              <Button variant="outline" onClick={() => setCurrentPage("dashboard")}>
                ← Volver
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Estado de Invitaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>profesor1@ejemplo.com</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">Pendiente</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>profesor2@ejemplo.com</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Aceptada</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentPage === "student-invitations" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Invitaciones de Alumnos</h1>
              <Button variant="outline" onClick={() => setCurrentPage("dashboard")}>
                ← Volver
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Estado de Invitaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>alumno1@ejemplo.com</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">Pendiente</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>alumno2@ejemplo.com</span>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">Rechazada</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Dashboard principal */}
        {currentPage === "dashboard" && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="materias" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Materias</span>
              </TabsTrigger>
              <TabsTrigger value="metricas" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Métricas</span>
              </TabsTrigger>
              <TabsTrigger value="gestion" className="flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>Gestión</span>
              </TabsTrigger>
              <TabsTrigger value="configuracion" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Configuración</span>
              </TabsTrigger>
            </TabsList>

            {/* Materias Tab */}
            <TabsContent value="materias" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Gestión de Materias</h2>
                <div className="flex space-x-2">
                  <Button onClick={onCreateSubject}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Materia
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar CSV
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {subjects.map((subject) => (
                  <Card
                    key={subject.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => {
                      setSelectedSubject(subject)
                      setCurrentPage("subject-detail")
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{subject.name}</h3>
                          <p className="text-gray-600">Profesor: {subject.professor}</p>
                          <p className="text-sm text-gray-500">
                            {subject.days.join(", ")} • {subject.startTime} - {subject.endTime}
                          </p>
                          <p className="text-sm text-gray-500">{subject.students} alumnos</p>
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
              <h2 className="text-xl font-semibold">Dashboard de Métricas</h2>

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
            </TabsContent>

            {/* Gestión Tab */}
            <TabsContent value="gestion" className="space-y-6">
              <h2 className="text-xl font-semibold">Gestión de Invitaciones</h2>

              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Profesores</span>
                    </CardTitle>
                    <p className="text-sm text-gray-600">Gestiona las invitaciones a profesores</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Button onClick={() => setCurrentPage("invite-professor")}>
                        <Mail className="h-4 w-4 mr-2" />
                        Invitar Profesor
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
                      <span>Alumnos</span>
                    </CardTitle>
                    <p className="text-sm text-gray-600">Gestiona las invitaciones a alumnos</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Button onClick={() => setCurrentPage("invite-student")}>
                        <Mail className="h-4 w-4 mr-2" />
                        Invitar Alumno
                      </Button>
                      <Button variant="outline" onClick={() => setCurrentPage("student-invitations")}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Invitaciones
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Cargar desde Excel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Configuración Tab */}
            <TabsContent value="configuracion" className="space-y-6">
              <h2 className="text-xl font-semibold">Configuración</h2>

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
                          <p className="text-sm text-gray-600">Permite a los profesores gestionar otros profesores</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Gestionar alumnos</p>
                          <p className="text-sm text-gray-600">Permite agregar/remover alumnos de materias</p>
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
