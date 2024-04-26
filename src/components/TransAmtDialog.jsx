import { Button } from "react-bootstrap";
import { useState } from "react";
import { db } from "../config/firebase";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { doc, updateDoc } from "firebase/firestore";

export function TransAmtDialog({
  transactionID,
  uid,
  setTriggerFetch,
  triggerFetch,
}) {
  // Use useCallback to memoize the onChange handler
  const [updatedTransactionAmount, setUpdatedTransactionAmount] = useState("");

  const updateTransaction = async (id) => {
    const accountRef = doc(db, `${uid}`, id);
    await updateDoc(accountRef, {
      newTransactionAmount: updatedTransactionAmount,
    });

    setTriggerFetch(!triggerFetch);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="btn btn-secondary btn-sm">Update Amount</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Amount</DialogTitle>
          <DialogTitle>
            Make changes to the amount here.
            <br></br>
            Click Update Transaction when you're done.
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="updatedBalance" className="text-right">
              Amount
            </Label>
            {/* Use Input component and add id attribute */}
            <Input
              id="updatedBalance"
              placeholder="Updated Balance"
              type="number"
              value={updatedTransactionAmount}
              onChange={(e) =>
                setUpdatedTransactionAmount(Number(e.target.value))
              }
              className="col-span-3"
            />
          </div>
          <h3>Add a Transaction</h3>
          <div>
            <label htmlFor="accountType">Account:</label>
            <select
              id="accountType"
              value={accountType}
              onChange={(event) => setAccountType(event.target.value)}
            >
              <option value="Debit">Debit</option>
              <option value="Credit">Credit</option>
              <option value="Savings">Savings</option>
            </select>

            <div>
              <label htmlFor="accountBalance">Current Account Balance:</label>
              <span id="accountBalance">{accountBalance.toFixed(2)}</span>
            </div>
            <input
              type="text"
              placeholder="Transaction Name"
              onChange={(e) => setNewTransactionName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Transaction Amount"
              onChange={(e) => setNewTransactionAmount(e.target.value)}
            />
            <input
              aria-label="Date"
              type="date"
              placeholder="Transaction Date"
              onChange={(e) => setNewTransactionDate(e.target.value)}
            />

            <label htmlFor="transactionType">Withdraw or Deposit:</label>
            <select
              id="transactionType"
              value={newTransactionType}
              onChange={(event) => setNewTransactionType(event.target.value)}
            >
              <option value="Withdrawl">Withdrawl</option>
              <option value="Deposit">Deposit</option>
            </select>

            <label htmlFor="monthlyExpense">Monthly Expense:</label>
            <select
              id="monthlyExpense"
              value={monthlyExpense}
              onChange={(event) => setMonthlyExpense(event.target.value)}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            <></>
            <Button onClick={addTransaction}>Submit Account</Button>
          </div>
        </div>
        <DialogFooter>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => updateTransaction(transactionID)}
          >
            Update Transaction
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
