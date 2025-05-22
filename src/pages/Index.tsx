import TaskManager from "@/components/TaskManager";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-accent/10 py-6 mb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-purple-600 via-accent to-indigo-400 text-transparent bg-clip-text">
            Task Management System
          </h1>
          <p className="text-center text-muted-foreground mt-2">
            Organize and manage your tasks efficiently
          </p>
        </div>
      </header>

      <main>
        <TaskManager />
      </main>

      <footer className="mt-16 py-6 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Task Management System &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
