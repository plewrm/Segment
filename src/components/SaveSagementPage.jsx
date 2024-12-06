import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import Slide from "@mui/material/Slide";


const SaveSegmentPage = () => {
    const [open, setOpen] = useState(false);
    const [segmentName, setSegmentName] = useState("");
    const [schemas, setSchemas] = useState([{ id: 1, value: "" }]);

    const webhookURL = "/api";

    const handleOpen = () => setOpen(true);
    const handleClose = () => {

        setOpen(false);
        setSegmentName(""); 
        setSchemas([{ id: 1, value: "" }]);
    }

    const handleAddNewSchema = () => {
        setSchemas([...schemas, { id: schemas.length + 1, value: "" }]);
    };

    const handleSchemaChange = (id, value) => {
        const updatedSchemas = schemas.map((schema) =>
            schema.id === id ? { ...schema, value } : schema
        );
        setSchemas(updatedSchemas);
    };

    const handleSave = async () => {

        if (!segmentName || schemas.every((schema) => !schema.value)) {
            alert("Please fill in the segment name and add at least one schema.");
            return;
        }

        const formattedData = {
            segment_name: segmentName,
            schema: schemas
                .filter((schema) => schema.value)
                .map((schema) => ({
                    [schema.value]: schema.value
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase()),
                })),
        };

        try {
            const response = await axios.post(webhookURL, formattedData);
            console.log("Response from server:", response.data);
            alert("Segment saved successfully!");
        } catch (error) {
            console.error("Error saving segment:", error);
            alert("Failed to save segment. Please try again.");
        }

        setOpen(false);
        setSegmentName(""); 
        setSchemas([{ id: 1, value: "" }]);
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', padding: "5rem", backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleOpen}
                style={{ padding: "10px 20px", fontSize: "16px" }}
            >
                Save Segment
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{"Save New Segment"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the segment name and add schemas to the segment.
                    </DialogContentText>

                    <TextField
                        fullWidth
                        label="Segment Name"
                        variant="outlined"
                        margin="normal"
                        value={segmentName}
                        onChange={(e) => setSegmentName(e.target.value)}
                    />

                    {schemas.map((schemaItem) => (
                        <FormControl fullWidth margin="normal" key={schemaItem.id}>
                            <InputLabel>Add schema to segment</InputLabel>
                            <Select
                                value={schemaItem.value}
                                onChange={(e) =>
                                    handleSchemaChange(schemaItem.id, e.target.value)
                                }
                                label="Add schema to segment"
                            >
                                <MenuItem value="first_name">First Name</MenuItem>
                                <MenuItem value="last_name">Last Name</MenuItem>
                                <MenuItem value="gender">Gender</MenuItem>
                                <MenuItem value="age">Age</MenuItem>
                                <MenuItem value="account_name">Account Name</MenuItem>
                                <MenuItem value="city">City</MenuItem>
                                <MenuItem value="state">State</MenuItem>
                            </Select>
                        </FormControl>
                    ))}

                    <div style={{ marginTop: "10px", textAlign: "left" }}>
                        <Button
                            onClick={handleAddNewSchema}
                            style={{
                                color: "#1976d2",
                                textDecoration: "none",
                                fontWeight: "bold",
                            }}
                        >
                            +Add new schema
                        </Button>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SaveSegmentPage;
