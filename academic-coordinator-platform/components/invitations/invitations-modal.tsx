"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Mail, Clock, CheckCircle, XCircle } from "lucide-react"

interface InvitationsModalProps {
  type: "professors" | "students"
  onClose: () => void
}

export function InvitationsModal({ type, onClose }: InvitationsModalProps) {
  const invitations = [
    { name: "Dr. Roberto Silva", email: "roberto.silva@mail.com", status: "pending", date: "2024-01-15" },
    { name: "Dra. Carmen Vega", email: "carmen.vega@mail.com", status: "accepted", date: "2024-01-14" },
    { name: "Prof. Luis Morales", email: "luis.morales@mail.com", status: "rejected", date: "2024-01-13" },
    { name: "Dra. Elena Ruiz", email: "elena.ruiz@mail.com", status: "pending", date: "2024-01-12" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pendiente
          </Badge>
        )
      case "accepted":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Aceptada
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Rechazada
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Invitaciones de {type === "professors" ? "Profesores" : "Alumnos"}</span>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invitations.map((invitation, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{invitation.name}</h3>
                    <p className="text-sm text-gray-600">{invitation.email}</p>
                  </div>
                  {getStatusBadge(invitation.status)}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    {getStatusIcon(invitation.status)}
                    <span>Enviada el {invitation.date}</span>
                  </div>
                  {invitation.status === "pending" && (
                    <Button size="sm" variant="outline">
                      Reenviar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
