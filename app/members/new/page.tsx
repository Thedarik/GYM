"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function NewMemberPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [membership, setMembership] = useState('monthly')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    // Bu yerda API chaqiruvi bo'ladi. Hozircha faqat redirect qilamiz.
    router.push('/members')
  }

  return (
    <div className="mx-auto max-w-2xl p-4 md:p-8">
      <Card asChild>
        <form onSubmit={submit} className="space-y-6">
          <CardHeader>
            <CardTitle>Yangi a'zo qo'shish</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Ism familiya</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+998 xx xxx xx xx" required />
            </div>

            <div className="space-y-2">
              <Label>Tarif turi</Label>
              <Select value={membership} onValueChange={setMembership}>
                <SelectTrigger>
                  <SelectValue placeholder="Tarif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Oylik</SelectItem>
                  <SelectItem value="quarterly">Choraklik</SelectItem>
                  <SelectItem value="annual">Yillik</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link href="/members">Bekor qilish</Link>
            </Button>
            <Button type="submit">Saqlash</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}





