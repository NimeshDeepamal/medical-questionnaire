'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, useMemo } from 'react'

interface Submission {
  id: string
  created_at: string
  first_name: string
  last_name: string
  email: string
  phone_number: string | null
  date_of_birth: string | null
  gender: string | null
  symptoms: string[]
  score: number
  risk_level: string
  additional_notes: string | null
}

interface SubmissionsTableProps {
  submissions: Submission[]
  onRefresh: () => void
}

export function SubmissionsTable({ submissions, onRefresh }: SubmissionsTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRisk, setFilterRisk] = useState<string | null>(null)

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const matchesSearch =
        sub.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRisk = !filterRisk || sub.risk_level === filterRisk

      return matchesSearch && matchesRisk
    })
  }, [submissions, searchTerm, filterRisk])

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low':
        return 'bg-green-100 text-green-800'
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800'
      case 'High':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex gap-4 flex-wrap">
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-64"
          />
          <select
            value={filterRisk || ''}
            onChange={(e) => setFilterRisk(e.target.value || null)}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white"
          >
            <option value="">All Risk Levels</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
          <Button onClick={onRefresh} variant="outline">
            Refresh
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Showing {filteredSubmissions.length} of {submissions.length} submissions
        </p>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Score</TableHead>
              <TableHead className="font-semibold">Risk Level</TableHead>
              <TableHead className="font-semibold">Submitted</TableHead>
              <TableHead className="font-semibold">Symptoms</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No submissions found
                </TableCell>
              </TableRow>
            ) : (
              filteredSubmissions.map((submission) => (
                <TableRow key={submission.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    {submission.first_name} {submission.last_name}
                  </TableCell>
                  <TableCell className="text-sm">{submission.email}</TableCell>
                  <TableCell className="text-center font-semibold">
                    {submission.score}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getRiskColor(submission.risk_level)}`}>
                      {submission.risk_level}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {formatDate(submission.created_at)}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {submission.symptoms.length} selected
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
