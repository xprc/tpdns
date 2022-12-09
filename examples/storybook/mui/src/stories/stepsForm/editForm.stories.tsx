import React, { useEffect } from "react";
import { HttpError } from "@pankod/refine-core";
import {
    TextField,
    MenuItem,
    Edit,
    Button,
    SaveButton,
    Box,
    Stepper,
    Step,
    StepButton,
} from "@pankod/refine-mui";
import { useStepsForm } from "@pankod/refine-react-hook-form";

import { RefineWithoutLayout } from "../../../.storybook/preview";

import { IPost } from "interfaces";

export default {
    title: "Hooks / Steps Form",
    decorators: [(Story: React.FC) => RefineWithoutLayout(Story)],
};

const stepTitles = [
    "Edit an post title",
    "Edit an post status",
    "Edit an content",
];

export const EditForm: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading, setId },
        register,
        handleSubmit,
        formState: { errors },
        steps: { currentStep, gotoStep },
    } = useStepsForm<IPost, HttpError, IPost>({
        stepsProps: {
            isBackValidate: false,
        },
        refineCoreProps: {
            action: "edit",
        },
    });

    useEffect(() => {
        setId(1);
    }, []);

    const required = {
        value: true,
        message: "This field is required",
    };

    const renderStep = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <TextField
                        {...register("title", { required })}
                        error={!!errors?.title}
                        helperText={errors?.title?.message}
                        margin="normal"
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                    />
                );
            case 1:
                return (
                    <TextField
                        {...register("status", { required })}
                        select
                        label="Select"
                        helperText={errors?.status?.message}
                        defaultValue="draft"
                    >
                        <MenuItem value="published">Published</MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                    </TextField>
                );
            case 2:
                return (
                    <>
                        <TextField
                            {...register("slug", { required })}
                            error={!!errors?.slug}
                            helperText={errors?.slug?.message}
                            margin="normal"
                            fullWidth
                            id="slug"
                            label="slug"
                            name="slug"
                        />
                        <TextField
                            {...register("content", { required })}
                            error={!!errors?.content}
                            helperText={errors?.content?.message}
                            margin="normal"
                            label="Content"
                            multiline
                            rows={4}
                        />
                    </>
                );
        }
    };

    return (
        <Edit
            isLoading={formLoading}
            actionButtons={
                <>
                    {currentStep > 0 && (
                        <Button
                            onClick={() => {
                                gotoStep(currentStep - 1);
                            }}
                        >
                            Previous
                        </Button>
                    )}
                    {currentStep < stepTitles.length - 1 && (
                        <Button
                            onClick={() => {
                                gotoStep(currentStep + 1);
                            }}
                        >
                            Next
                        </Button>
                    )}
                    {currentStep === stepTitles.length - 1 && (
                        <SaveButton onClick={handleSubmit(onFinish)} />
                    )}
                </>
            }
        >
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <Stepper nonLinear activeStep={currentStep}>
                    {stepTitles.map((label, index) => (
                        <Step key={label}>
                            <StepButton onClick={() => gotoStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <br />
                {renderStep(currentStep)}
            </Box>
        </Edit>
    );
};
