const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000";

/* =========================================================
   TYPES
========================================================= */

export type RequirementStatus =
  | "new"
  | "contacted"
  | "fulfilled"
  | "cancelled"
  | "delivered";

export interface Requirement {
  id: number;
  customer_id: number;
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

export interface CustomerRegister {
  name: string;
  email: string;
  contact: string;
  password: string;
}

export interface CustomerLogin {
  email: string;
  password: string;
}

export interface CustomerProfile {
  id: number;
  name: string;
  email: string;
  contact: string;
  created_at: string;
  total_requirements: number;
  total_requested_litres: number;
}

export interface CustomerProfileUpdate {
  name: string;
  email: string;
  contact: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

/* =========================================================
   ERROR HANDLER
========================================================= */

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
        .map(
          (item: { msg?: string }) =>
            item.msg || "Validation error",
        )
        .join(", ");
    }
  } catch {
    // Ignore JSON parsing errors.
  }

  return fallback;
}

/* =========================================================
   REQUIREMENTS
========================================================= */

export async function createRequirement(
  data: RequirementCreate,
  token?: string,
): Promise<Requirement> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_URL}/api/requirements`,
    {
      method: "POST",
      headers,
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

/* =========================================================
   GET ALL REQUIREMENTS - TEAM
========================================================= */

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

/* =========================================================
   GET CUSTOMER REQUIREMENTS
========================================================= */

export async function getCustomerRequirements(
  token: string,
): Promise<Requirement[]> {
  const response = await fetch(
    `${API_URL}/api/customer/requirements`,
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
        "Unable to load your requirements.",
      ),
    );
  }

  return response.json();
}

/* =========================================================
   UPDATE REQUIREMENT STATUS
========================================================= */

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

/* =========================================================
   EXPORT REQUIREMENTS CSV
========================================================= */

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

/* =========================================================
   TEAM LOGIN
========================================================= */

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

/* =========================================================
   CUSTOMER REGISTER
========================================================= */

export async function customerRegister(
  data: CustomerRegister,
): Promise<LoginResponse> {
  const response = await fetch(
    `${API_URL}/api/customer/register`,
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
        "Unable to create customer account.",
      ),
    );
  }

  return response.json();
}

/* =========================================================
   CUSTOMER LOGIN
========================================================= */

export async function customerLogin(
  data: CustomerLogin,
): Promise<LoginResponse> {
  const response = await fetch(
    `${API_URL}/api/customer/login`,
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
        "Invalid email or password.",
      ),
    );
  }

  return response.json();
}

/* =========================================================
   CUSTOMER PROFILE
========================================================= */

export async function getCustomerProfile(
  token: string,
): Promise<CustomerProfile> {
  const response = await fetch(
    `${API_URL}/api/customer/profile`,
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
        "Unable to load customer profile.",
      ),
    );
  }

  return response.json();
}

/* =========================================================
   UPDATE CUSTOMER PROFILE
========================================================= */

export async function updateCustomerProfile(
  data: CustomerProfileUpdate,
  token: string,
): Promise<CustomerProfile> {
  const response = await fetch(
    `${API_URL}/api/customer/profile`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    throw new Error(
      await getErrorMessage(
        response,
        "Unable to update your profile.",
      ),
    );
  }

  return response.json();
}