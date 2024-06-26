import { useEffect, useState, useRef } from "react";

import "../App.css";
import { Auth } from "./auth";
import { db, auth } from "../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useNavigate, Navigate } from "react-router-dom";
import LoginDialogTemplate from "@/components/LoginDialogTemplate";
import SignupDialogTemplate from "@/components/SignupDialogTemplate";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function CreateBudgetDialog({
  uid,
  triggerFetch,
  setTriggerFetch,
  setBudgetTriggerFetch,
  budgetTriggerFetch,
  accountList,
  setAccountList,
  budgetAccount,
  setBudgetAccount,
}) {
  // Use State sets the input budget and ammount for the create budget method
  const [newBudget, setNewBudget] = useState("");
  const [newBudgetAmount, setNewBudgetAmount] = useState(0);

  // This code is to close the dialog box, the closeDialog method will be added to the createBudget method to close the dialog box when clicking create budget.
  const [isDialogOpen, setIsDialogOpen] = useState(true); //?variable to manage dialog box visibility
  const dialogKey = useRef(0);

  const closeDialog = () => {
    setIsDialogOpen(false);
    dialogKey.current += 1;
  };
  // this set the database path for Firebase
  const budgetCollectionRef = collection(db, `budget/${uid}/newBudget`);

  // This creates the budget document in firebase using newBudget, newBudgetAmount
  const createBudget = async () => {
    console.log("UID", uid, newBudget, newBudgetAmount);
    const docRef = await addDoc(budgetCollectionRef, {
      newBudget,
      newBudgetAmount,
    });
    console.log("CREATE BUDGET CREATEBUDGET DIALOG");
    console.log("create budget");
    setTriggerFetch(!triggerFetch);
    setBudgetTriggerFetch(!budgetTriggerFetch);
    closeDialog();
    setNewBudget(""), setNewBudgetAmount(0);
  };

  return (
    <>
      <div className="App">
        <Dialog
          key={dialogKey.current}
          isOpen={isDialogOpen}
          onClose={closeDialog}
        >
          <DialogTrigger asChild>
            <button className="rounded-full shadow-md hover:bg-slate-500 bg-slate-400 text-white py-2 px-3">
              Create Budget
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            {" "}
            <h3 className="flex justify-center">Create a Budget</h3>
            <div>
              <DialogHeader>
                <DialogTitle>
                  Add a Budget Category and Monthly Limit
                </DialogTitle>
              </DialogHeader>
              <div className="flex justify-center">
                <input
                  type="text"
                  placeholder="Budget Name"
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="rounded mb-1"
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="number"
                  placeholder="Budget Amount"
                  onChange={(e) => setNewBudgetAmount(Number(e.target.value))}
                  className="rounded mb-1"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="rounded-full shadow-md hover:bg-slate-500 bg-slate-400 text-white py-2 px-3"
                onClick={createBudget}
              >
                Create Budget
              </button>
            </div>
            <DialogFooter>
              {/* <button
                
                className="rounded-full shadow-md hover:bg-slate-500 bg-slate-400 text-white py-2 px-3"
                onClick={createBudget}
              >
                Create Budget
              </button> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>{" "}
      </div>
    </>
  );
}

export default CreateBudgetDialog;
