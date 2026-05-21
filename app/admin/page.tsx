'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getRiskLevel, getRiskColor, getRiskTextColor } from '@/lib/cvs-scoring';

interface Questionnaire {
  id: string;
  created_at: string;
  age: string;
  gender: string;
  faculty_of_study: string;
  total_score: number;
  visual_symptoms_score: number;
  ocular_surface_score: number;
  extra_ocular_score: number;
  productivity_impact: string;
  consulted_eye_care: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<Questionnaire[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Questionnaire[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication
    const authenticated = sessionStorage.getItem('adminAuthenticated');
    if (!authenticated) {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);
    fetchSubmissions();
  }, [router]);

  useEffect(() => {
    filterSubmissions();
  }, [submissions, searchTerm, riskFilter]);
      interface Questionnaire {
        id: string;
        created_at: string;
        age: string;
        gender: string;
        faculty_of_study: string;
        digital_devices: string[];
        digital_devices_other: string | null;
        consecutive_hours: string | null;
        screen_viewing_distance: string | null;
        regular_breaks: string | null;
        breaks_frequency: string | null;
        eye_strain_reduction: string[];
        lighting_conditions: string | null;
        screen_position: string | null;
        sitting_posture: string | null;
        chair_support: string | null;
        neck_bending_frequency: string | null;
        device_holding_position: string | null;
        visual_symptoms: string[];
        visual_symptoms_score: number;
        ocular_surface_symptoms: string[];
        ocular_surface_score: number;
        extra_ocular_symptoms: string[];
        extra_ocular_score: number;
        symptoms_frequency: string | null;
        associated_with_screen_use: string | null;
        eye_conditions: string[];
        corrective_lenses: string | null;
        device_use_before_sleep: string | null;
        sleep_hours: string | null;
        eye_drops_usage: string | null;
        eye_drops_frequency: string | null;
        productivity_impact: string | null;
        consulted_eye_care: string | null;
        changed_study_habits: string | null;
        study_habit_changes_description: string | null;
        study_habit_changes_list: string[];
        study_habit_frequency: string | null;
        study_habit_association: string | null;
        study_habit_apply_frequency: string | null;
        study_habit_help_level: string | null;
        total_score: number;
        submit_confirmation: boolean;
      }
      setIsLoading(false);
    }
  };

  const filterSubmissions = () => {
    let filtered = submissions;

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (sub) =>
          sub.age.toLowerCase().includes(search) ||
          sub.gender.toLowerCase().includes(search) ||
          sub.faculty_of_study.toLowerCase().includes(search)
      );
    }

    if (riskFilter !== 'all') {
      filtered = filtered.filter((sub) => {
        const risk = getRiskLevel(sub.total_score);
        return risk === riskFilter;
      });
    }

    setFilteredSubmissions(filtered);
  };

  const calculateStats = () => {
    if (submissions.length === 0) return null;

    const avgScore = Math.round(
      submissions.reduce((sum, sub) => sum + sub.total_score, 0) / submissions.length
    );

    const riskCounts = {
      'No CVS Symptoms': submissions.filter((s) => getRiskLevel(s.total_score) === 'No CVS Symptoms').length,
      'Mild CVS': submissions.filter((s) => getRiskLevel(s.total_score) === 'Mild CVS').length,
      'Moderate CVS': submissions.filter((s) => getRiskLevel(s.total_score) === 'Moderate CVS').length,
      'Severe CVS': submissions.filter((s) => getRiskLevel(s.total_score) === 'Severe CVS').length,
    };

    return { avgScore, riskCounts };
  };

  const stats = calculateStats();

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    sessionStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CVS Submissions Dashboard</h1>
              <p className="text-gray-600 mt-1">View and analyze questionnaire submissions</p>
            </div>
            <div className="flex gap-2">
              <Link href="/">
                <Button variant="outline" className="px-6 py-2">
                  Back to Form
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="px-6 py-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <p className="text-gray-600 text-sm font-medium">Total Submissions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{submissions.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <p className="text-gray-600 text-sm font-medium">Average Score</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.avgScore}</p>
            </div>
            <div className="bg-green-50 rounded-lg shadow p-6 border border-green-200">
              <p className="text-green-700 text-sm font-medium">No Symptoms</p>
              <p className="text-3xl font-bold text-green-900 mt-2">{stats.riskCounts['No CVS Symptoms']}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg shadow p-6 border border-yellow-200">
              <p className="text-yellow-700 text-sm font-medium">Mild CVS</p>
              <p className="text-3xl font-bold text-yellow-900 mt-2">{stats.riskCounts['Mild CVS']}</p>
            </div>
            <div className="bg-red-50 rounded-lg shadow p-6 border border-red-200">
              <p className="text-red-700 text-sm font-medium">Moderate+Severe</p>
              <p className="text-3xl font-bold text-red-900 mt-2">
                {stats.riskCounts['Moderate CVS'] + stats.riskCounts['Severe CVS']}
              </p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <Input
                type="text"
                placeholder="Search by age, gender, or faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Risk Level</label>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="all">All Risk Levels</option>
                <option value="No CVS Symptoms">No CVS Symptoms</option>
                <option value="Mild CVS">Mild CVS</option>
                <option value="Moderate CVS">Moderate CVS</option>
                <option value="Severe CVS">Severe CVS</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-600">
              <p>Loading submissions...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">
              <p>{error}</p>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="p-8 text-center text-gray-600">
              <p>No submissions found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Gender</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Faculty</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Score</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Risk Level</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Visual</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Ocular</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Extra-ocular</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Eye Care</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSubmissions.map((submission, index) => {
                    const risk = getRiskLevel(submission.total_score);
                    const colorClasses = getRiskColor(submission.total_score);
                    const textColorClass = getRiskTextColor(submission.total_score);
                    const date = new Date(submission.created_at).toLocaleDateString();

                    return (
                      <tr key={submission.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">{date}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{submission.age}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{submission.gender}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{submission.faculty_of_study}</td>
                        <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                          {submission.total_score}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${textColorClass}`}>
                            {risk}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-700">
                          {submission.visual_symptoms_score}
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-700">
                          {submission.ocular_surface_score}
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-700">
                          {submission.extra_ocular_score}
                        </td>
                        <td className="px-6 py-4 text-center text-sm">
                          {submission.consulted_eye_care === 'Yes' ? (
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                              Yes
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-semibold">
                              No
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>Showing {filteredSubmissions.length} of {submissions.length} submissions</p>
        </div>
      </div>
    </main>
  );
}
