import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Lock, CheckCircle2, Loader2 } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";
import { AuthFormInput } from "@/components/ui/AuthFormInput";
import { Button } from "@/components/ui/Button";
import { OtpStep } from "@/components/auth/OtpStep";
import {
  phoneOnlySchema,
  type PhoneOnlyForm,
  newPasswordSchema,
  type NewPasswordForm,
} from "@/lib/validation";

type Step = "phone" | "otp" | "reset" | "done";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("phone");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");

  const phoneForm = useForm<PhoneOnlyForm>({
    resolver: zodResolver(phoneOnlySchema),
  });
  const passwordForm = useForm<NewPasswordForm>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmitPhone = async (data: PhoneOnlyForm) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setPhone(data.phone);
    setLoading(false);
    setStep("otp");
  };

  const onVerify = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setStep("reset");
  };

  const onResetPassword = async (data: NewPasswordForm) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Mật khẩu mới:", data);
    setLoading(false);
    setStep("done");
  };

  return (
    <AuthLayout
      title="Quên mật khẩu"
      footer={
        step !== "done" ? (
          <>
            Bạn đã nhớ mật khẩu?{" "}
            <Link to="/dang-nhap" className="font-bold text-blue-brand hover:underline">
              Đăng nhập ngay
            </Link>
          </>
        ) : undefined
      }
    >
      {step === "phone" && (
        <form
          onSubmit={phoneForm.handleSubmit(onSubmitPhone)}
          className="flex flex-col gap-5"
        >
          <AuthFormInput
            id="phone"
            icon={Phone}
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            inputMode="tel"
            error={phoneForm.formState.errors.phone?.message}
            {...phoneForm.register("phone")}
          />
          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Đang gửi...
              </>
            ) : (
              "Gửi mã"
            )}
          </Button>
        </form>
      )}

      {step === "otp" && (
        <OtpStep phone={phone} onVerify={onVerify} loading={loading} submitLabel="Xác nhận" />
      )}

      {step === "reset" && (
        <form
          onSubmit={passwordForm.handleSubmit(onResetPassword)}
          className="flex flex-col gap-5"
        >
          <AuthFormInput
            id="password"
            icon={Lock}
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            password
            error={passwordForm.formState.errors.password?.message}
            {...passwordForm.register("password")}
          />
          <AuthFormInput
            id="confirm"
            icon={Lock}
            label="Xác nhận mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới"
            password
            error={passwordForm.formState.errors.confirm?.message}
            {...passwordForm.register("confirm")}
          />
          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Đang cập nhật...
              </>
            ) : (
              "Lưu mật khẩu"
            )}
          </Button>
        </form>
      )}

      {step === "done" && (
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 size={48} />
          </span>
          <p className="text-muted">
            Mật khẩu của bạn đã được cập nhật. Hãy đăng nhập bằng mật khẩu mới.
          </p>
          <Button onClick={() => navigate("/dang-nhap")} size="lg" className="w-full">
            Đăng nhập ngay
          </Button>
        </div>
      )}
    </AuthLayout>
  );
}
