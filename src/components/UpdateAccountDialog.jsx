import { Button } from "react-bootstrap";
import { useState, useCallback } from "react";
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

export function UpdateAccountDialog({
  accountID,
  uid,
  setAccountTriggerFetch,
  accountTriggerFetch,
  accountName,
}) {
  const [updatedAccountName, setUpdatedAccountName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  const updateAccount = async (id, updateAccountName) => {
    console.log(id, updateAccountName);
    console.log(updatedAccountName);
    const accountRef = doc(db, `account/${uid}/newAccount`, id);
    await updateDoc(accountRef, { accountName: updateAccountName }); // Corrected the updateDoc call
    setAccountTriggerFetch(!accountTriggerFetch);
    setIsDialogOpen(false); // Close the dialog after updating the account
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="btn btn-secondary btn-sm"
          onClick={() => setIsDialogOpen(true)}
        >
          Change Account Name
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            Change Account Name Here
            <br></br>
            Click Update Account To Change Name.
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-center">
          <div className="grid grid-cols-2 items-center gap-4">
            <div>
              <Label htmlFor="updatedBalance" className="text-right">
                Current Account Name: {accountName}
              </Label>
              <br></br>
              <br></br>
              <Input
                id="updatedName"
                placeholder="Enter New Account Name"
                type="text"
                value={updatedAccountName}
                onChange={(e) => setUpdatedAccountName(e.target.value)}
                className="col-span-3"
              />
              <br></br>
            </div>
            <br></br>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-secondary "
          onClick={() => updateAccount(accountID, updatedAccountName)}
        >
          Update Account
        </button>
      </DialogContent>
    </Dialog>
  );
}
