// app/actions.js    ← or lib/actions.js, src/actions.js — anywhere outside client boundaries
'use server'

let userList = [
  {
    id: 'u1',
    firstName: 'Emma',
    lastName: 'Wilson',
    registeredAt: '2024-03-15T10:30:00Z',
    lastPaymentYear: 2026,
    lastPaymentMonth: 2,
  },
  {
    id: 'u2',
    firstName: 'Liam',
    lastName: 'Chen',
    registeredAt: '2025-11-03T14:15:00Z',
    lastPaymentYear: 2025,
    lastPaymentMonth: 12,
  },
]

export async function addUser(formData) {
  const firstName = formData.get('firstName')?.toString().trim()
  const lastName  = formData.get('lastName')?.toString().trim()

  if (!firstName || !lastName) {
    return { success: false, error: 'First and last name are required' }
  }

  const newUser = {
    id: 'u' + Date.now().toString(36),
    firstName,
    lastName,
    registeredAt: new Date().toISOString(),
  }

  userList.push(newUser)

  // Optional: if using App Router + caching → revalidatePath('/users') or revalidateTag('users')
  // For Pages Router → we skip revalidatePath (not supported)

  return { success: true, user: newUser }
}

export async function deleteUser(formData) {
  const id = formData.get('id')?.toString()
  if (!id) return { success: false, error: 'No ID provided' }

  const initialLength = userList.length
  userList = userList.filter(u => u.id !== id)

  const success = userList.length < initialLength

  // Optional: revalidatePath('/users') in App Router

  return { success }
}

export function getUsers() {
  // Return a copy to avoid direct mutation issues
  return [...userList]
}