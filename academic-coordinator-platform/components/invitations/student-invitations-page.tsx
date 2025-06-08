"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StudentInvitationsPageProps {
  onBack: () => void
}

export function StudentInvitationsPage({ onBack }: StudentInvitationsPageProps) {
  const invitations = [
    { email: "estudiante1@ejemplo.com", status: "pending" },
    { email: "estudiante2@ejemplo.com", status: "rejected" },
    { email: "estudiante3@ejemplo.com", status: "accepted" },
  ]

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Invitaciones de Estudiantes</h1>
        <Button variant="outline" onClick={onBack}>
          ← Volver
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estado de Invitaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invitations.map((invitation, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <span className="font-medium">{invitation.email}</span>
                {getStatusBadge(invitation.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
