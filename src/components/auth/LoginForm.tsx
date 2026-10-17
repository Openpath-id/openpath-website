"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface LoginFormProps {
  idPrefix?: string;
  isDesktop?: boolean;
}

export default function LoginForm({ idPrefix = "auth", isDesktop = false }: LoginFormProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    rememberMe,
    setRememberMe,
    loading,
    error,
    fieldErrors,
    handleLogin,
  } = useAuth();

  const emailId = `${idPrefix}-email`;
  const passwordId = `${idPrefix}-password`;
  const rememberId = `${idPrefix}-remember`;

  return (
    <form onSubmit={handleLogin} noValidate className="w-full flex flex-col">
      {error && (
        <div
          className={`mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-[8px] ${
            isDesktop ? "text-[14px]" : "text-[12px]"
          } font-medium font-Inter`}
        >
          {error}
        </div>
      )}

      {/* 2 Fields dengan jarak 16px (mobile) / 20px (desktop) */}
      <div className={`flex flex-col ${isDesktop ? "gap-[20px]" : "gap-[16px]"} w-full`}>
        {/* Email Field */}
        <div className="flex flex-col">
          <Label
            htmlFor={emailId}
            className={`${
              isDesktop ? "text-[16px]" : "text-[14px]"
            } font-semibold text-[#17221F] mb-2`}
          >
            Email <span className="text-[#EB5757]">*</span>
          </Label>
          <Input
            id={emailId}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan alamat email kamu"
            className={`${
              isDesktop
                ? "h-[52px] px-[18px] text-[16px] placeholder:text-[14px]"
                : "h-[46px] px-[16px] text-[14px] placeholder:text-[12px]"
            } ${
              fieldErrors.email
                ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
          />
          {fieldErrors.email && (
            <span className="text-[12px] text-red-500 mt-1.5 font-normal font-Inter">
              {fieldErrors.email}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col">
          <Label
            htmlFor={passwordId}
            className={`${
              isDesktop ? "text-[16px]" : "text-[14px]"
            } font-semibold text-[#17221F] mb-2`}
          >
            Kata Sandi <span className="text-[#EB5757]">*</span>
          </Label>
          <div className="relative w-full">
            <Input
              id={passwordId}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi kamu"
              className={`${
                isDesktop
                  ? "h-[52px] pl-[18px] pr-[48px] text-[16px] placeholder:text-[14px]"
                  : "h-[46px] pl-[16px] pr-[44px] text-[14px] placeholder:text-[12px]"
              } ${
                fieldErrors.password
                  ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500"
                  : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
              className={`absolute ${
                isDesktop ? "right-[16px]" : "right-[14px]"
              } top-1/2 -translate-y-1/2 text-[#17221F] hover:text-[#176B5B] transition-colors focus:outline-none flex items-center justify-center cursor-pointer`}
            >
              {showPassword ? (
                <EyeOff className="w-[20px] h-[20px]" />
              ) : (
                <Eye className="w-[20px] h-[20px]" />
              )}
            </button>
          </div>
          {fieldErrors.password && (
            <span className="text-[12px] text-red-500 mt-1.5 font-normal font-Inter">
              {fieldErrors.password}
            </span>
          )}
        </div>
      </div>

      {/* Ingatkan Saya (gap ke bawah 8px) */}
      <div className="mt-[8px] flex items-center justify-between w-full">
        <label htmlFor={rememberId} className="flex items-center gap-2 cursor-pointer select-none">
          <Checkbox
            id={rememberId}
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
          />
          <span
            className={`${
              isDesktop ? "text-[14px]" : "text-[12px]"
            } font-normal text-[#17221F] font-Inter`}
          >
            Ingatkan Saya
          </span>
        </label>
        {/* Catatan: 'Lupa Sandi' diabaikan sesuai instruksi pengguna */}
      </div>

      {/* Submit Button (gap: 24px mobile, 56px desktop) */}
      <Button
        type="submit"
        disabled={loading}
        size={isDesktop ? "lg" : "default"}
        className={`w-full ${isDesktop ? "mt-[56px]" : "mt-[24px]"}`}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white mr-2" />
            <span>Memproses...</span>
          </>
        ) : (
          "Masuk"
        )}
      </Button>

      {/* Footer Text (gap ke bawah 32px) */}
      {/* <div className="mt-[32px] text-center">
        <span
          className={`${
            isDesktop ? "text-[14px]" : "text-[12px]"
          } font-normal text-[#17221F] font-Inter`}
        >
          Belum punya akun?{" "}
        </span>
        <Link
          href="/register"
          className={`${
            isDesktop ? "text-[14px]" : "text-[12px]"
          } font-bold text-[#176B5B] underline hover:text-[#125548] transition-colors font-Inter`}
        >
          Daftar
        </Link>
      </div> */}
    </form>
  );
}
