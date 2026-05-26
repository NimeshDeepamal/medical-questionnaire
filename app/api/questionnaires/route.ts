import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

async function ensureQuestionnaireColumns() {
  const db = getDb();

  await db.query(`
    alter table public.questionnaires
      add column if not exists academic_year text,
      add column if not exists average_screen_time text
  `);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.age || !data.gender || !data.faculty_of_study) {
      return NextResponse.json(
        { error: "Missing required demographic fields" },
        { status: 400 },
      );
    }

    const insertQuery = `
      insert into questionnaires (
        age,
        gender,
        faculty_of_study,
        academic_year,
        average_screen_time,
        digital_devices,
        digital_devices_other,
        consecutive_hours,
        screen_viewing_distance,
        regular_breaks,
        breaks_frequency,
        eye_strain_reduction,
        lighting_conditions,
        screen_position,
        sitting_posture,
        chair_support,
        neck_bending_frequency,
        device_holding_position,
        visual_symptoms,
        visual_symptoms_score,
        ocular_surface_symptoms,
        ocular_surface_score,
        extra_ocular_symptoms,
        extra_ocular_score,
        symptoms_frequency,
        associated_with_screen_use,
        eye_conditions,
        corrective_lenses,
        device_use_before_sleep,
        sleep_hours,
        eye_drops_usage,
        eye_drops_frequency,
        productivity_impact,
        consulted_eye_care,
        changed_study_habits,
        study_habit_changes_description,
        study_habit_changes_list,
        study_habit_frequency,
        study_habit_association,
        study_habit_apply_frequency,
        study_habit_help_level,
        total_score,
        submit_confirmation
      ) values (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
        $31, $32, $33, $34, $35, $36, $37, $38, $39, $40,
        $41, $42, $43
      )
      returning *
    `;

    const insertValues = [
      data.age,
      data.gender,
      data.faculty_of_study,
      data.academic_year || null,
      data.average_screen_time || null,
      data.digital_devices || [],
      data.digital_devices_other || null,
      data.consecutive_hours || null,
      data.screen_viewing_distance || null,
      data.regular_breaks || null,
      data.breaks_frequency || null,
      data.eye_strain_reduction || [],
      data.lighting_conditions || null,
      data.screen_position || null,
      data.sitting_posture || null,
      data.chair_support || null,
      data.neck_bending_frequency || null,
      data.device_holding_position || null,
      data.visual_symptoms || [],
      Number(data.visual_symptoms_score || 0),
      data.ocular_surface_symptoms || [],
      Number(data.ocular_surface_score || 0),
      data.extra_ocular_symptoms || [],
      Number(data.extra_ocular_score || 0),
      data.symptoms_frequency || null,
      data.associated_with_screen_use || null,
      data.eye_conditions || [],
      data.corrective_lenses || null,
      data.device_use_before_sleep || null,
      data.sleep_hours || null,
      data.eye_drops_usage || null,
      data.eye_drops_frequency || null,
      data.productivity_impact || null,
      data.consulted_eye_care || null,
      data.changed_study_habits || null,
      data.study_habit_changes_description || null,
      data.study_habit_changes_list || [],
      data.study_habit_frequency || null,
      data.study_habit_association || null,
      data.study_habit_apply_frequency || null,
      data.study_habit_help_level || null,
      Number(data.total_score || 0),
      true,
    ];

    await ensureQuestionnaireColumns();

    const db = getDb();
    // Debug: log value count and key fields to help diagnose insert errors
    console.log("Questionnaire insert - values count:", insertValues.length);
    console.log(
      "Questionnaire insert - academic_year, average_screen_time:",
      insertValues[3],
      insertValues[4],
    );
    const insertedData = await db.query(insertQuery, insertValues);

    return NextResponse.json(
      {
        success: true,
        data: insertedData.rows,
        message: "Questionnaire submitted successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("API error:", error);
    const message =
      error instanceof Error ? error.message : JSON.stringify(error);
    const stack = error instanceof Error && error.stack ? error.stack : null;
    return NextResponse.json(
      { error: message || "Internal server error", stack },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    const result = await db.query(
      "select * from questionnaires order by created_at desc",
    );

    return NextResponse.json({ data: result.rows }, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing questionnaire id" },
        { status: 400 },
      );
    }

    const db = getDb();
    const deleted = await db.query(
      "delete from questionnaires where id = $1 returning id",
      [id],
    );

    if (deleted.rowCount === 0) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
