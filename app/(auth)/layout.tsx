export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className=" flex flex-col w-full h-full justify-center items-center mt-32">
        {children}
      </div>
    )
  }