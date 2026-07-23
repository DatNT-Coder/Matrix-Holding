import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Lock, Gift, CheckCircle2, Loader2 } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";
import { AuthFormInput } from "@/components/ui/AuthFormInput";
import { Button } from "@/components/ui/Button";
import { OtpStep } from "@/components/auth/OtpStep";
import { registerSchema, type RegisterForm } from "@/lib/validation";

type Step = "form" | "otp" | "done";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Đăng ký:", data);
    setPhone(data.phone);
    setLoading(false);
    setStep("otp");
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
            id="phone"
            icon={Phone}
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            inputMode="tel"
            error={errors.phone?.message}
            {...register("phone")}
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
        <OtpStep phone={phone} onVerify={onVerify} loading={loading} submitLabel="Xác thực" />
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
