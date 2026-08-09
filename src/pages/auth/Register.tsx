import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock, Gift, CheckCircle2, Loader2 } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";
import { AuthFormInput } from "@/components/ui/AuthFormInput";
import { Button } from "@/components/ui/Button";
import { OtpStep } from "@/components/auth/OtpStep";
import { registerSchema, type RegisterForm } from "@/lib/validation";
import { apiRegister } from "@/lib/api";

type Step = "form" | "otp" | "done";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      await apiRegister(payload);
      setRegisteredEmail(data.email);
      setLoading(false);
      setStep("done");
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "Đăng ký thất bại");
    }
  };

  const onVerify = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setStep("done");
  };

  return (
    <AuthLayout
      title="Đăng ký tài khoản"
      footer={
        step !== "done" ? (
          <>
            Đã có tài khoản?{" "}
            <Link to="/dang-nhap" className="font-bold text-blue-brand hover:underline">
              Đăng nhập ngay
            </Link>
          </>
        ) : undefined
      }
    >
      {step === "form" && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <AuthFormInput
            id="username"
            icon={User}
            label="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập"
            error={errors.username?.message}
            {...register("username")}
          />
          <AuthFormInput
            id="email"
            icon={Mail}
            label="Email"
            placeholder="Nhập email"
            inputMode="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <AuthFormInput
            id="password"
            icon={Lock}
            label="Mật khẩu"
            placeholder="Tạo mật khẩu"
            password
            error={errors.password?.message}
            {...register("password")}
          />
          <AuthFormInput
            id="confirm"
            icon={Lock}
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu"
            password
            error={errors.confirm?.message}
            {...register("confirm")}
          />
          <AuthFormInput
            id="referral"
            icon={Gift}
            label="Mã giới thiệu"
            placeholder="Nhập mã giới thiệu (nếu có)"
            {...register("referral")}
          />

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <Button type="submit" size="lg" disabled={loading} className="mt-2 w-full">
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Đang xử lý...
              </>
            ) : (
              "Đăng ký"
            )}
          </Button>
        </form>
      )}

      {step === "otp" && (
        <OtpStep phone={registeredEmail} onVerify={onVerify} loading={loading} submitLabel="Xác thực" />
      )}

      {step === "done" && (
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 size={48} />
          </span>
          <p className="text-muted">
            Tài khoản của bạn đã được tạo thành công. Hãy đăng nhập để bắt đầu
            kết nối.
          </p>
          <Button onClick={() => navigate("/dang-nhap")} size="lg" className="w-full">
            Đăng nhập ngay
          </Button>
        </div>
      )}
    </AuthLayout>
  );
}
