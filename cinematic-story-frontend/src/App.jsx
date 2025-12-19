import AppRoutes from "./routes/AppRoutes";
import StarBackground from "./components/Background/StarBackground";

export default function App() {
  return (
    <>
      <StarBackground />
      <div className="relative z-10 min-h-screen">
        <AppRoutes />
      </div>
    </>
  );
}
