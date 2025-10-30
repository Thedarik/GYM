"use client"

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type Member = {
  id: string
  fullName: string
  phone: string
  membership: 'monthly' | 'quarterly' | 'annual'
  status: 'active' | 'paused' | 'expired'
}

const MOCK_MEMBERS: Member[] = [
  { id: '1', fullName: 'Ali Karimov', phone: '+998 90 123 45 67', membership: 'monthly', status: 'active' },
  { id: '2', fullName: 'Laylo Otabekova', phone: '+998 97 111 22 33', membership: 'annual', status: 'paused' },
  { id: '3', fullName: 'Jasur Abdullayev', phone: '+998 93 555 66 77', membership: 'quarterly', status: 'expired' },
  { id: '4', fullName: 'Malika Abdullaeva', phone: '+998 95 700 88 99', membership: 'monthly', status: 'active' },
]

export default function MembersPage() {
  const [query, setQuery] = useState('')
  const [membership, setMembership] = useState<string>('all')
  const [status, setStatus] = useState<string>('all')

  const filtered = useMemo(() => {
    return MOCK_MEMBERS.filter((m) => {
      const matchesQuery = `${m.fullName} ${m.phone}`.toLowerCase().includes(query.toLowerCase())
      const matchesMembership = membership === 'all' ? true : m.membership === membership
      const matchesStatus = status === 'all' ? true : m.status === status
      return matchesQuery && matchesMembership && matchesStatus
    })
  }, [query, membership, status])

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold">A'zolar</h1>
        <Button asChild>
          <Link href="/members/new">Yangi a'zo qo'shish</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtrlar</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Ism yoki telefon bo'yicha qidirish"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Select value={membership} onValueChange={setMembership}>
            <SelectTrigger>
              <SelectValue placeholder="Tarif turi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barchasi</SelectItem>
              <SelectItem value="monthly">Oylik</SelectItem>
              <SelectItem value="quarterly">Choraklik</SelectItem>
              <SelectItem value="annual">Yillik</SelectItem>
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Holat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barchasi</SelectItem>
              <SelectItem value="active">Faol</SelectItem>
              <SelectItem value="paused">To'xtatilgan</SelectItem>
              <SelectItem value="expired">Muddati tugagan</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ro'yxat</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ism familiya</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Tarif</TableHead>
                <TableHead>Holat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.fullName}</TableCell>
                  <TableCell>{m.phone}</TableCell>
                  <TableCell>{labelMembership(m.membership)}</TableCell>
                  <TableCell>{labelStatus(m.status)}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    Hech narsa topilmadi
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function labelMembership(type: Member['membership']) {
  if (type === 'monthly') return 'Oylik'
  if (type === 'quarterly') return 'Choraklik'
  return 'Yillik'
}

function labelStatus(s: Member['status']) {
  if (s === 'active') return 'Faol'
  if (s === 'paused') return "To'xtatilgan"
  return 'Muddati tugagan'
}





