import { api } from "@/app/api/client";
import { isAxiosError } from "axios";

export const getAllTemplates = async (
  userId: string,
  token: string,
  sessionId: string
) => {
  try {
    const response = await api.get("/api/v1/pre/template", {
      headers: {
        "clerk-user-id": userId,
        Authorization: `Bearer ${token}`,
        "clerk-session-id": sessionId,
      },
    });
    const data = response.data;
    if (!data.status) {
      throw new Error("Error fetching templates");
    }
    return data;
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error fetching templates: ", error);
    } else {
      console.error("An unexpected error occurred: ", error);
    }

    if (isAxiosError(error)) {
      const errorResponse = error.response?.data;
      return {
        status: false,
        message: errorResponse?.message || "Server communication error",
      };
    }

    return {
      status: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

export const getAllUserTemplates = async (
  userId: string,
  token: string,
  sessionId: string
) => {
  try {
    const response = await api.get("/api/v1/template", {
      headers: {
        "clerk-user-id": userId,
        Authorization: `Bearer ${token}`,
        "clerk-session-id": sessionId,
      },
    });
    const data = response.data;
    if (!data.status) {
      throw new Error("Error fetching templates");
    }
    return data;
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error fetching templates: ", error);
    } else {
      console.error("An unexpected error occurred: ", error);
    }

    if (isAxiosError(error)) {
      const errorResponse = error.response?.data;
      return {
        status: false,
        message: errorResponse?.message || "Server communication error",
      };
    }

    return {
      status: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

export const getTemplateById = async (
  userId: string,
  token: string,
  sessionId: string,
  templateId: string | string[]
) => {
  try {
    const response = await api.get(`/api/v1/pre/template/${templateId}`, {
      headers: {
        "clerk-user-id": userId,
        Authorization: `Bearer ${token}`,
        "clerk-session-id": sessionId,
      },
    });
    const data = response.data;
    if (!data.status) {
      throw new Error("Error fetching template");
    }
    return data;
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error fetching template: ", error);
    } else {
      console.error("An unexpected error occurred: ", error);
    }

    if (isAxiosError(error)) {
      const errorResponse = error.response?.data;
      return {
        status: false,
        message: errorResponse?.message || "Server communication error",
      };
    }

    return {
      status: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

export const saveTemplate = async (
  payload: any,
  userId: string,
  token: string,
  sessionId: string
) => {
  try {
    const response = await api.post("/api/v1/template", payload, {
      headers: {
        "clerk-user-id": userId,
        Authorization: `Bearer ${token}`,
        "clerk-session-id": sessionId,
      },
    });
    const data = response.data;
    if (!data.status) {
      throw new Error("Error saving template");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error saving template: ", error);
    } else {
      console.error("An unexpected error occurred: ", error);
    }

    if (isAxiosError(error)) {
      const errorResponse = error.response?.data;
      return {
        status: false,
        message: errorResponse?.message || "Server communication error",
      };
    }

    return {
      status: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

export const runTemplate = async (
  templateId: string,
  payload: any,
  userId: string,
  token: string,
  sessionId: string
) => {
  try {
    const response = await api.post(
      `/api/v1/template/${templateId}/run`,
      payload,
      {
        headers: {
          "clerk-user-id": userId,
          Authorization: `Bearer ${token}`,
          "clerk-session-id": sessionId,
        },
      }
    );
    const data = response.data;
    if (!data.status) {
      throw new Error("Error running template");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error running template: ", error);
    } else {
      console.error("An unexpected error occurred: ", error);
    }

    if (isAxiosError(error)) {
      const errorResponse = error.response?.data;
      return {
        status: false,
        message: errorResponse?.message || "Server communication error",
      };
    }

    return {
      status: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};
