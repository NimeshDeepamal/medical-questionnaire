import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const data = await request.json()

    // Validate required fields
    if (!data.age || !data.gender || !data.faculty_of_study) {
      return NextResponse.json(
        { error: 'Missing required demographic fields' },
        { status: 400 }
      )
    }

    // Insert into database
    const { data: insertedData, error } = await supabase
      .from('questionnaires')
      .insert([
        {
          age: data.age,
          gender: data.gender,
          faculty_of_study: data.faculty_of_study,
          digital_devices: data.digital_devices || [],
          consecutive_hours: data.consecutive_hours,
          screen_viewing_distance: data.screen_viewing_distance,
          regular_breaks: data.regular_breaks,
          breaks_frequency: data.breaks_frequency,
          eye_strain_reduction: data.eye_strain_reduction || [],
          lighting_conditions: data.lighting_conditions,
          screen_position: data.screen_position,
          visual_symptoms: data.visual_symptoms || [],
          visual_symptoms_score: data.visual_symptoms_score,
          ocular_surface_symptoms: data.ocular_surface_symptoms || [],
          ocular_surface_score: data.ocular_surface_score,
          extra_ocular_symptoms: data.extra_ocular_symptoms || [],
          extra_ocular_score: data.extra_ocular_score,
          symptoms_frequency: data.symptoms_frequency,
          associated_with_screen_use: data.associated_with_screen_use,
          corrective_lenses: data.corrective_lenses,
          sleep_hours: data.sleep_hours,
          eye_drops_usage: data.eye_drops_usage,
          eye_drops_frequency: data.eye_drops_frequency,
          productivity_impact: data.productivity_impact,
          consulted_eye_care: data.consulted_eye_care,
          changed_study_habits: data.changed_study_habits,
          study_habit_changes_description: data.study_habit_changes_description,
          total_score: data.total_score,
          submit_confirmation: true,
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save questionnaire' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: insertedData,
        message: 'Questionnaire submitted successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('questionnaires')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch questionnaires' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
