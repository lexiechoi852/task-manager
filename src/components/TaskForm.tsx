import {Formik, Form} from "formik";
import * as Yup from "yup";
import {Button, FormControl, FormGroup, FormLabel, FormSelect} from "react-bootstrap";
import categories from "../categories.ts";

interface TaskFormProps {
    addTask: (title: string, dueDate: string, category: string) => void
}

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')
        .min(3, 'Title should be at least 3 characters.'),
    dueDate: Yup.date()
        .required('Invalid date. The format should be YYYY-MM-DD.'),
    category: Yup.string()
        .required('Category is required.'),
})

const TaskForm = ({addTask}: TaskFormProps) => {
    return (
        <Formik
            initialValues={{
                title: '',
                dueDate: '',
                category: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
                const {title, dueDate, category} = values
                addTask(title, dueDate, category)
                resetForm()
            }}
        >
            {({handleSubmit, handleChange, values, touched, errors}) => (
                <Form noValidate onSubmit={handleSubmit} className="form">
                    <FormGroup className="mb-4">
                        <FormLabel>Title</FormLabel>
                        <FormControl
                            type="text"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                        />
                        {
                            touched.title && errors.title && <div className="error-message">{errors.title}</div>
                        }
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <FormLabel>Due Date</FormLabel>
                        <FormControl
                            type="date"
                            name="dueDate"
                            value={values.dueDate}
                            onChange={handleChange}
                        />
                        {
                            touched.dueDate && errors.dueDate && <div className="error-message">{errors.dueDate}</div>
                        }
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <FormLabel>Category</FormLabel>
                        <FormSelect
                            aria-label="category"
                            name="category"
                            value={values.category}
                            onChange={handleChange}
                        >
                            <option value=""></option>
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </FormSelect>
                        {
                            touched.category && errors.category &&
                            <div className="error-message">{errors.category}</div>
                        }
                    </FormGroup>
                    <Button variant="primary" type="submit" className="mt-3">Submit</Button>
                </Form>
            )}
        </Formik>
    );
};

export default TaskForm;