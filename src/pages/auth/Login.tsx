import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Lock, Loader2 } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";
import { AuthFormInput } from "@/components/ui/AuthFormInput";
import { Button } from "@/components/ui/Button";
import { loginSchema, type LoginForm } from "@/lib/validation";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    // Mock: giả lập gọi API đăng nhập
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Đăng nhập:", data);
    setLoading(false);
    navigate("/");
  };

  return (
    <AuthLayout
      title="Đăng nhập tài khoản"
      footer={
        <>
          Bạn chưa có tài khoản?{" "}
          <Link to="/dang-ky" className="font-bold text-blue-brand hover:underline">
            Đăng ký ngay
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
          placeholder="Nhập mật khẩu"
          password
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-navy/30 text-blue-brand focus:ring-blue-brand"
              {...register("remember")}
            />
            Lưu mật khẩu
          </label>
          <Link
            to="/quen-mat-khau"
            className="text-sm font-semibold text-blue-brand hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <Button type="submit" size="lg" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Đang xử lý...
            </>
          ) : (
            "Đăng nhập"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}
