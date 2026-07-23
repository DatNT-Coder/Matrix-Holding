import { useEffect, useState } from "react";
import { KeyRound, Loader2 } from "lucide-react";
import { AuthFormInput } from "@/components/ui/AuthFormInput";
import { Button } from "@/components/ui/Button";

interface Props {
  phone: string;
  onVerify: () => void;
  loading?: boolean;
  submitLabel?: string;
}

export function OtpStep({
  phone,
  onVerify,
  loading = false,
  submitLabel = "Xác thực",
}: Props) {
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [error, setError] = useState("");

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.replace(/\D/g, "").length < 4) {
      setError("Vui lòng nhập mã xác thực hợp lệ");
      return;
    }
    setError("");
    // Mock: mọi mã hợp lệ đều được chấp nhận
    onVerify();
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      {phone && (
        <p className="text-center text-sm text-muted">
          Mã xác thực đã gửi tới{" "}
          <span className="font-bold text-navy">{phone}</span>
        </p>
      )}

      <AuthFormInput
        id="otp"
        icon={KeyRound}
        label="Mã xác thực"
        placeholder="Nhập mã xác thực"
        inputMode="numeric"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        error={error}
      />

      <div className="text-center text-sm text-muted">
        {seconds > 0 ? (
          <>
            Gửi lại mã sau <span className="font-bold text-navy">{seconds}s</span>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setSeconds(60)}
            className="font-bold text-blue-brand hover:underline"
          >
            Gửi lại mã
          </button>
        )}
      </div>

      <Button type="submit" size="lg" disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Đang xác thực...
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  );
}
