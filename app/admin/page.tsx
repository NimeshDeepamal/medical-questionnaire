"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getRiskColor,
  getRiskLevel,
  getRiskTextColor,
} from "@/lib/cvs-scoring";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";

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

const displayArray = (value?: string[] | null) => {
  if (!value || value.length === 0) return "-";
  return value.join(", ");
};

const displayValue = (value?: string | null | number | boolean) => {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
};

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<Questionnaire[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const authenticated = sessionStorage.getItem("adminAuthenticated");
    if (!authenticated) {
      router.push("/admin/login");
      return;
    }

    setIsAuthenticated(true);
    fetchSubmissions();
  }, [router]);

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/questionnaires");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setSubmissions(data.data || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load submissions");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSubmissions = useMemo(() => {
    let filtered = submissions;

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter((sub) => {
        const haystack = [
          sub.age,
          sub.gender,
          sub.faculty_of_study,
          displayArray(sub.digital_devices),
          displayValue(sub.digital_devices_other),
          displayValue(sub.consecutive_hours),
          displayValue(sub.screen_viewing_distance),
          displayValue(sub.regular_breaks),
          displayValue(sub.breaks_frequency),
          displayArray(sub.eye_strain_reduction),
          displayValue(sub.lighting_conditions),
          displayValue(sub.screen_position),
          displayValue(sub.sitting_posture),
          displayValue(sub.chair_support),
          displayValue(sub.neck_bending_frequency),
          displayValue(sub.device_holding_position),
          displayArray(sub.visual_symptoms),
          displayArray(sub.ocular_surface_symptoms),
          displayArray(sub.extra_ocular_symptoms),
          displayValue(sub.symptoms_frequency),
          displayValue(sub.associated_with_screen_use),
          displayArray(sub.eye_conditions),
          displayValue(sub.corrective_lenses),
          displayValue(sub.device_use_before_sleep),
          displayValue(sub.sleep_hours),
          displayValue(sub.eye_drops_usage),
          displayValue(sub.eye_drops_frequency),
          displayValue(sub.productivity_impact),
          displayValue(sub.consulted_eye_care),
          displayValue(sub.changed_study_habits),
          displayValue(sub.study_habit_changes_description),
          displayArray(sub.study_habit_changes_list),
          displayValue(sub.study_habit_frequency),
          displayValue(sub.study_habit_association),
          displayValue(sub.study_habit_apply_frequency),
          displayValue(sub.study_habit_help_level),
          String(sub.total_score),
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(search);
      });
    }

    if (riskFilter !== "all") {
      filtered = filtered.filter(
        (sub) => getRiskLevel(sub.total_score) === riskFilter,
      );
    }

    return filtered;
  }, [submissions, searchTerm, riskFilter]);

  const stats = useMemo(() => {
    if (submissions.length === 0) return null;

    const avgScore = Math.round(
      submissions.reduce((sum, sub) => sum + sub.total_score, 0) /
        submissions.length,
    );

    return {
      avgScore,
      riskCounts: {
        "No CVS Symptoms": submissions.filter(
          (s) => getRiskLevel(s.total_score) === "No CVS Symptoms",
        ).length,
        "Mild CVS": submissions.filter(
          (s) => getRiskLevel(s.total_score) === "Mild CVS",
        ).length,
        "Moderate CVS": submissions.filter(
          (s) => getRiskLevel(s.total_score) === "Moderate CVS",
        ).length,
        "Severe CVS": submissions.filter(
          (s) => getRiskLevel(s.total_score) === "Severe CVS",
        ).length,
      },
    };
  }, [submissions]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuthenticated");
    sessionStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Delete this submission? This cannot be undone.",
    );
    if (!confirmed) return;

    try {
      setDeletingId(id);
      const response = await fetch(
        `/api/questionnaires?id=${encodeURIComponent(id)}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete submission");
      }

      await fetchSubmissions();
    } catch (err) {
      console.error(err);
      alert("Failed to delete submission");
    } finally {
      setDeletingId(null);
    }
  };

  const exportToExcel = () => {
    const exportData = filteredSubmissions.map((submission) => ({
      id: submission.id,
      created_at: submission.created_at,
      age: submission.age,
      gender: submission.gender,
      faculty_of_study: submission.faculty_of_study,
      digital_devices: displayArray(submission.digital_devices),
      digital_devices_other: displayValue(submission.digital_devices_other),
      consecutive_hours: displayValue(submission.consecutive_hours),
      screen_viewing_distance: displayValue(submission.screen_viewing_distance),
      regular_breaks: displayValue(submission.regular_breaks),
      breaks_frequency: displayValue(submission.breaks_frequency),
      eye_strain_reduction: displayArray(submission.eye_strain_reduction),
      lighting_conditions: displayValue(submission.lighting_conditions),
      screen_position: displayValue(submission.screen_position),
      sitting_posture: displayValue(submission.sitting_posture),
      chair_support: displayValue(submission.chair_support),
      neck_bending_frequency: displayValue(submission.neck_bending_frequency),
      device_holding_position: displayValue(submission.device_holding_position),
      visual_symptoms: displayArray(submission.visual_symptoms),
      visual_symptoms_score: submission.visual_symptoms_score,
      ocular_surface_symptoms: displayArray(submission.ocular_surface_symptoms),
      ocular_surface_score: submission.ocular_surface_score,
      extra_ocular_symptoms: displayArray(submission.extra_ocular_symptoms),
      extra_ocular_score: submission.extra_ocular_score,
      symptoms_frequency: displayValue(submission.symptoms_frequency),
      associated_with_screen_use: displayValue(
        submission.associated_with_screen_use,
      ),
      eye_conditions: displayArray(submission.eye_conditions),
      corrective_lenses: displayValue(submission.corrective_lenses),
      device_use_before_sleep: displayValue(submission.device_use_before_sleep),
      sleep_hours: displayValue(submission.sleep_hours),
      eye_drops_usage: displayValue(submission.eye_drops_usage),
      eye_drops_frequency: displayValue(submission.eye_drops_frequency),
      productivity_impact: displayValue(submission.productivity_impact),
      consulted_eye_care: displayValue(submission.consulted_eye_care),
      changed_study_habits: displayValue(submission.changed_study_habits),
      study_habit_changes_description: displayValue(
        submission.study_habit_changes_description,
      ),
      study_habit_changes_list: displayArray(
        submission.study_habit_changes_list,
      ),
      study_habit_frequency: displayValue(submission.study_habit_frequency),
      study_habit_association: displayValue(submission.study_habit_association),
      study_habit_apply_frequency: displayValue(
        submission.study_habit_apply_frequency,
      ),
      study_habit_help_level: displayValue(submission.study_habit_help_level),
      total_score: submission.total_score,
      risk_level: getRiskLevel(submission.total_score),
      submit_confirmation: submission.submit_confirmation ? "Yes" : "No",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Questionnaires");
    XLSX.writeFile(
      workbook,
      `questionnaires-${new Date().toISOString().slice(0, 10)}.xlsx`,
    );
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
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                CVS Submissions Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                View, export, and manage questionnaire submissions
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={exportToExcel}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white"
              >
                Export Excel
              </Button>
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

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <p className="text-gray-600 text-sm font-medium">
                Total Submissions
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {submissions.length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <p className="text-gray-600 text-sm font-medium">Average Score</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.avgScore}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg shadow p-6 border border-green-200">
              <p className="text-green-700 text-sm font-medium">No Symptoms</p>
              <p className="text-3xl font-bold text-green-900 mt-2">
                {stats.riskCounts["No CVS Symptoms"]}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg shadow p-6 border border-yellow-200">
              <p className="text-yellow-700 text-sm font-medium">Mild CVS</p>
              <p className="text-3xl font-bold text-yellow-900 mt-2">
                {stats.riskCounts["Mild CVS"]}
              </p>
            </div>
            <div className="bg-red-50 rounded-lg shadow p-6 border border-red-200">
              <p className="text-red-700 text-sm font-medium">
                Moderate+Severe
              </p>
              <p className="text-3xl font-bold text-red-900 mt-2">
                {stats.riskCounts["Moderate CVS"] +
                  stats.riskCounts["Severe CVS"]}
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <Input
                type="text"
                placeholder="Search by age, gender, faculty, symptoms, or devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Risk Level
              </label>
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
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-[1]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Created
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Age
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Gender
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Faculty
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Devices
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      21.4
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      21.5
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Risk
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      All Inputs
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSubmissions.map((submission) => {
                    const risk = getRiskLevel(submission.total_score);
                    const textColorClass = getRiskTextColor(
                      submission.total_score,
                    );
                    const colorClasses = getRiskColor(submission.total_score);
                    const created = new Date(
                      submission.created_at,
                    ).toLocaleString();
                    const symptomsFrequencyScore =
                      submission.symptoms_frequency === "Rare"
                        ? 0
                        : submission.symptoms_frequency === "Infrequent"
                          ? 1
                          : submission.symptoms_frequency === "Frequent"
                            ? 3
                            : 0;
                    const screenTimeAssociationScore =
                      submission.associated_with_screen_use === "Never"
                        ? 0
                        : submission.associated_with_screen_use === "Sometimes"
                          ? 1
                          : submission.associated_with_screen_use === "Always"
                            ? 3
                            : 0;

                    return (
                      <tr
                        key={submission.id}
                        className="align-top hover:bg-gray-50"
                      >
                        <td className="px-4 py-4 whitespace-nowrap text-gray-700">
                          {created}
                        </td>
                        <td className="px-4 py-4 text-gray-700">
                          {submission.age}
                        </td>
                        <td className="px-4 py-4 text-gray-700">
                          {submission.gender}
                        </td>
                        <td className="px-4 py-4 text-gray-700">
                          {submission.faculty_of_study}
                        </td>
                        <td className="px-4 py-4 text-gray-700">
                          {displayArray(submission.digital_devices)}
                        </td>
                        <td className="px-4 py-4 text-gray-700">
                          {symptomsFrequencyScore}
                          <div className="text-xs text-gray-500 mt-1">
                            {displayValue(submission.symptoms_frequency)}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-700">
                          {screenTimeAssociationScore}
                          <div className="text-xs text-gray-500 mt-1">
                            {displayValue(
                              submission.associated_with_screen_use,
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-900 font-semibold">
                          {submission.total_score}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded text-xs font-semibold ${textColorClass} ${colorClasses}`}
                          >
                            {risk}
                          </span>
                        </td>
                        <td className="px-4 py-4 min-w-[560px]">
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-700">
                            <div>
                              <span className="font-semibold">
                                Other devices:
                              </span>{" "}
                              {displayValue(submission.digital_devices_other)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Consecutive hours:
                              </span>{" "}
                              {displayValue(submission.consecutive_hours)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Screen distance:
                              </span>{" "}
                              {displayValue(submission.screen_viewing_distance)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Regular breaks:
                              </span>{" "}
                              {displayValue(submission.regular_breaks)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Break frequency:
                              </span>{" "}
                              {displayValue(submission.breaks_frequency)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Eye strain reduction:
                              </span>{" "}
                              {displayArray(submission.eye_strain_reduction)}
                            </div>
                            <div>
                              <span className="font-semibold">Lighting:</span>{" "}
                              {displayValue(submission.lighting_conditions)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Screen position:
                              </span>{" "}
                              {displayValue(submission.screen_position)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Sitting posture:
                              </span>{" "}
                              {displayValue(submission.sitting_posture)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Chair support:
                              </span>{" "}
                              {displayValue(submission.chair_support)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Neck bending:
                              </span>{" "}
                              {displayValue(submission.neck_bending_frequency)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Holding position:
                              </span>{" "}
                              {displayValue(submission.device_holding_position)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Visual symptoms:
                              </span>{" "}
                              {displayArray(submission.visual_symptoms)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Visual score:
                              </span>{" "}
                              {submission.visual_symptoms_score}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Ocular symptoms:
                              </span>{" "}
                              {displayArray(submission.ocular_surface_symptoms)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Ocular score:
                              </span>{" "}
                              {submission.ocular_surface_score}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Extra-ocular symptoms:
                              </span>{" "}
                              {displayArray(submission.extra_ocular_symptoms)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Extra-ocular score:
                              </span>{" "}
                              {submission.extra_ocular_score}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Eye conditions:
                              </span>{" "}
                              {displayArray(submission.eye_conditions)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Corrective lenses:
                              </span>{" "}
                              {displayValue(submission.corrective_lenses)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Before sleep:
                              </span>{" "}
                              {displayValue(submission.device_use_before_sleep)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Sleep hours:
                              </span>{" "}
                              {displayValue(submission.sleep_hours)}
                            </div>
                            <div>
                              <span className="font-semibold">Eye drops:</span>{" "}
                              {displayValue(submission.eye_drops_usage)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Eye drops freq:
                              </span>{" "}
                              {displayValue(submission.eye_drops_frequency)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Productivity impact:
                              </span>{" "}
                              {displayValue(submission.productivity_impact)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Consulted eye care:
                              </span>{" "}
                              {displayValue(submission.consulted_eye_care)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Changed habits:
                              </span>{" "}
                              {displayValue(submission.changed_study_habits)}
                            </div>
                            <div>
                              <span className="font-semibold">Habit desc:</span>{" "}
                              {displayValue(
                                submission.study_habit_changes_description,
                              )}
                            </div>
                            <div>
                              <span className="font-semibold">Habit list:</span>{" "}
                              {displayArray(
                                submission.study_habit_changes_list,
                              )}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Habit frequency:
                              </span>{" "}
                              {displayValue(submission.study_habit_frequency)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Habit association:
                              </span>{" "}
                              {displayValue(submission.study_habit_association)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Apply frequency:
                              </span>{" "}
                              {displayValue(
                                submission.study_habit_apply_frequency,
                              )}
                            </div>
                            <div>
                              <span className="font-semibold">Help level:</span>{" "}
                              {displayValue(submission.study_habit_help_level)}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Confirmation:
                              </span>{" "}
                              {submission.submit_confirmation ? "Yes" : "No"}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Button
                            onClick={() => handleDelete(submission.id)}
                            disabled={deletingId === submission.id}
                            variant="outline"
                            className="border-red-200 text-red-700 hover:bg-red-50"
                          >
                            {deletingId === submission.id
                              ? "Deleting..."
                              : "Delete"}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="text-center text-gray-600 text-sm">
          <p>
            Showing {filteredSubmissions.length} of {submissions.length}{" "}
            submissions
          </p>
        </div>
      </div>
    </main>
  );
}
