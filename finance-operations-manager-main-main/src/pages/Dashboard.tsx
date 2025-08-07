import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { OperationForm } from "@/components/OperationForm";
import { useState } from "react";
import { Plus, Pencil, Trash2, TrendingUp, TrendingDown, Wallet, PieChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Operation {
  id: string;
  label: string;
  amount: number;
  category: string;
  date: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [operations, setOperations] = useState<Operation[]>([
    {
      id: "1",
      label: "Salary",
      amount: 5000,
      category: "income",
      date: "2024-03-15"
    },
    {
      id: "2",
      label: "Rent",
      amount: -1500,
      category: "expense",
      date: "2024-03-01"
    }
  ]);
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);

  const handleCreateOperation = (values: any) => {
    const newOperation = {
      id: Date.now().toString(),
      ...values,
      amount: Number(values.amount)
    };
    setOperations([newOperation, ...operations]);
    toast({
      title: "Success",
      description: "Operation created successfully",
    });
  };

  const handleEditOperation = (values: any) => {
    if (!selectedOperation) return;
    setOperations(operations.map(op => 
      op.id === selectedOperation.id ? { ...op, ...values, amount: Number(values.amount) } : op
    ));
    setSelectedOperation(null);
    toast({
      title: "Success",
      description: "Operation updated successfully",
    });
  };

  const handleDeleteOperation = (id: string) => {
    setOperations(operations.filter(op => op.id !== id));
    toast({
      title: "Success",
      description: "Operation deleted successfully",
    });
  };

  const totalBalance = operations.reduce((acc, op) => acc + op.amount, 0);
  const totalIncome = operations.filter(op => op.amount > 0).reduce((acc, op) => acc + op.amount, 0);
  const totalExpenses = Math.abs(operations.filter(op => op.amount < 0).reduce((acc, op) => acc + op.amount, 0));
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 sm:p-6 lg:p-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            DEBORA-DASHBOARD
          </h1>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2 shadow-lg hover:shadow-primary/20 transition-all duration-300">
                  <Plus className="h-4 w-4" />
                  New Operation
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Operation</DialogTitle>
                </DialogHeader>
                <OperationForm onSubmit={handleCreateOperation} />
              </DialogContent>
            </Dialog>
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="shadow-lg hover:shadow-secondary/20 transition-all duration-300"
            >
              Sign out
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Total Balance</h3>
                <p className="text-2xl font-bold mt-1">
                  ${totalBalance.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Monthly Income</h3>
                <p className="text-2xl font-bold mt-1 text-green-500">
                  ${totalIncome.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-red-500/10">
                <TrendingDown className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Monthly Expenses</h3>
                <p className="text-2xl font-bold mt-1 text-red-500">
                  ${totalExpenses.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 glass">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-500/10">
                <PieChart className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Savings Rate</h3>
                <p className="text-2xl font-bold mt-1 text-blue-500">
                  {savingsRate}%
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="shadow-lg glass">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Operations</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Label</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {operations.map((operation) => (
                    <TableRow key={operation.id} className="hover:bg-secondary/50 transition-colors">
                      <TableCell className="font-medium">{operation.label}</TableCell>
                      <TableCell className={operation.amount > 0 ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                        ${Math.abs(operation.amount).toLocaleString()}
                      </TableCell>
                      <TableCell className="capitalize">{operation.category}</TableCell>
                      <TableCell>{new Date(operation.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setSelectedOperation(operation)}
                                className="hover:bg-secondary/80"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Operation</DialogTitle>
                              </DialogHeader>
                              <OperationForm
                                initialData={{
                                  label: operation.label,
                                  amount: operation.amount.toString(),
                                  category: operation.category,
                                  date: operation.date,
                                }}
                                onSubmit={handleEditOperation}
                              />
                            </DialogContent>
                          </Dialog>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="hover:bg-destructive/20 hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Operation</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this operation? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteOperation(operation.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}