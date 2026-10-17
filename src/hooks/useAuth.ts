"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginSchema } from "@/app/validation";

export function useAuth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  useEffect(() => {
    // Check if there is a remembered email
    const timer = setTimeout(() => {
      const savedEmail = localStorage.getItem("openpath_remembered_email");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    // Validasi input dengan Zod di client-side
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const errors: { email?: string; password?: string } = {};
      for (const issue of validation.error.issues) {
        if (issue.path[0] === "email" && !errors.email) {
          errors.email = issue.message;
        }
        if (issue.path[0] === "password" && !errors.password) {
          errors.password = issue.message;
        }
      }
      setFieldErrors(errors);
      toast.error("Validasi Gagal", {
        description: "Silakan periksa kembali email dan kata sandi Anda.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Email atau kata sandi salah. Silakan coba lagi.");
      }

      // Handle remember me
      if (typeof window !== "undefined") {
        if (rememberMe) {
          localStorage.setItem("openpath_remembered_email", email);
        } else {
          localStorage.removeItem("openpath_remembered_email");
        }

        // Store user/session info
        if (data.session) {
          localStorage.setItem("openpath_access_token", data.session.access_token);
        }
        if (data.user) {
          localStorage.setItem("openpath_user", JSON.stringify(data.user));
        }
      }

      // Toast Success
      toast.success("Login Berhasil!", {
        description: "Selamat datang kembali di OpenPath Admin.",
      });

      // Redirect to admin dashboard
      router.push("/admin");
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Terjadi kesalahan tidak terduga.";
      setError(errorMsg);
      toast.error("Login Gagal", {
        description: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail: (val: string) => {
      setEmail(val);
      if (fieldErrors.email) {
        setFieldErrors((prev) => ({ ...prev, email: undefined }));
      }
    },
    password,
    setPassword: (val: string) => {
      setPassword(val);
      if (fieldErrors.password) {
        setFieldErrors((prev) => ({ ...prev, password: undefined }));
      }
    },
    showPassword,
    setShowPassword,
    rememberMe,
    setRememberMe,
    loading,
    error,
    setError,
    fieldErrors,
    handleLogin,
  };
}
