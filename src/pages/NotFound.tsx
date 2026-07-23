import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-cream px-5 text-center">
      <Link to="/">
        <Logo />
      </Link>
      <p className="text-8xl font-extrabold text-navy/10">404</p>
      <h1 className="text-2xl font-extrabold text-navy">Không tìm thấy trang</h1>
      <p className="max-w-md text-muted">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
      </p>
      <Button to="/" size="lg">
        Về trang chủ
      </Button>
    </div>
  );
}
