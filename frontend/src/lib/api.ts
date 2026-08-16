const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

export type RequirementStatus =
  | "new"
  | "contacted"
  | "fulfilled"
  | "cancelled";

export interface Requirement {
  id: number;
  name: string;
  contact: string;
  qty_litres: number;
  location: string;
  note: string | null;
  status: RequirementStatus;
  submitted_at: string;
  updated_at: string;
  contacted_at: string | null;
}

export interface RequirementCreate {
  name: string;
  contact: string;
  qty_litres: number;
  location: string;
  note?: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
}

async function getErrorMessage(
  response: Response,
  fallback: string,
): Promise<string> {
  try {
    const error = await response.json();

    if (typeof error?.detail === "string") {
      return error.detail;
    }

    if (Array.isArray(error?.detail)) {
      return error.detail
        .map((item: { msg?: string }) => item.msg || "Validation error")
        .join(", ");
    }
  } catch {
    // Ignore JSON parsing errors.
  }

  return fallback;
}

export async function createRequirement(
  data: RequirementCreate,
): Promise<Requirement> {
  const response = await fetch(
    `${API_URL}/api/requirements`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        "Unable to submit requirement.",
      ),
    );
  }

  return response.json();
}

export async function teamLogin(
  passcode: string,
): Promise<LoginResponse> {
  const response = await fetch(
    `${API_URL}/api/team/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        passcode,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        "Invalid team passcode.",
      ),
    );
  }

  return response.json();
}

export async function getRequirements(
  token: string,
): Promise<Requirement[]> {
  const response = await fetch(
    `${API_URL}/api/requirements`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        "Unable to load requirements.",
      ),
    );
  }

  return response.json();
}

export async function updateRequirementStatus(
  requirementId: number,
  status: RequirementStatus,
  token: string,
): Promise<Requirement> {
  const response = await fetch(
    `${API_URL}/api/requirements/${requirementId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        "Unable to update requirement status.",
      ),
    );
  }

  return response.json();
}

export async function downloadRequirementsCsv(
  token: string,
): Promise<Blob> {
  const response = await fetch(
    `${API_URL}/api/requirements/export`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        "Unable to export requirements.",
      ),
    );
  }

  return response.blob();
}