import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import BudgetedItemTable from "./BudgetedItemTable";
import { PinLeftIcon } from "@radix-ui/react-icons";
import TransactionTable from "./TransactionTable";

export function MonthlyExpensesSheet({
  accountList,
  uid,
  budgetList,
  setAccountList,
  budgetTriggerFetch,
  triggerFetch,
  setTriggerFetch,
  setBudgetTriggerFetch,
  monthlyExpenses,
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="text-white">
          {/* Assuming Button component accepts variant and className props */}
          <button variant="outline" className="rounded-button-newuser">
            Monthly Transaction
          </button>
        </div>
      </SheetTrigger>
      <SheetContent style={{ width: "58%" }}>
        <div
          className="background-color-div text-black"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <SheetTitle>
            <h4 className="rounded-md text-white">Monthly Transactions</h4>
          </SheetTitle>

          {monthlyExpenses && (
            <TransactionTable
              uid={uid}
              triggerFetch={triggerFetch}
              setTriggerFetch={setTriggerFetch}
              accountList={accountList}
              setAccountList={setAccountList}
              accountTable={monthlyExpenses}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
