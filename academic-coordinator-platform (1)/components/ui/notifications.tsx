"use client"

import { X, Bell, CheckCircle, AlertCircle, Info } from "lucide-react"

export type NotificationType = "success" | "error" | "info" | "warning"

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  duration?: number
}

interface NotificationsProps {
  notifications: Notification[]
  onDismiss: (id: string) => void
}

export function Notifications({ notifications, onDismiss }: NotificationsProps) {
  return (
    <div className="fixed top-4 right-4 z-50 w-80 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="relative bg-white rounded-lg shadow-lg border overflow-hidden animate-in slide-in-from-right-full"
        >
          <div
            className={`p-4 ${
              notification.type === "success"
                ? "border-l-4 border-green-500"
                : notification.type === "error"
                  ? "border-l-4 border-red-500"
                  : notification.type === "warning"
                    ? "border-l-4 border-yellow-500"
                    : "border-l-4 border-blue-500"
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {notification.type === "success" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : notification.type === "error" ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : notification.type === "warning" ? (
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Info className="h-5 w-5 text-blue-500" />
                )}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500"
                  onClick={() => onDismiss(notification.id)}
                >
                  <span className="sr-only">Cerrar</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function NotificationBell({ count = 0 }: { count?: number }) {
  return (
    <div className="relative">
      <Bell className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </div>
  )
}
