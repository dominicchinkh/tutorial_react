
# Thinking About UI Declaratively & Structuring State


## Thinking About UI Declaratively

### 1. Identify Your Component’s Different Visual States
Before writing logic, identify all the distinct visual variations your component can present to the user.

### 2. Determine What Triggers Those State Changes
State transitions are triggered by either human interaction or system operations:

* **Human Triggers:**
  * **Changing Text Input:** Switches between `Empty` and `Typing` states depending on whether input contains text.
  * **Clicking Submit:** Switches to the `Submitting` state.
* **Computer Triggers:**
  * **Successful Network Response:** Switches to the `Success` state.
  * **Failed Network Response:** Switches to the `Error` state with a corresponding error message.

### 3. Represent the State in Memory Using `useState`
* **Simplicity is Key:** Each piece of state represents a "moving piece." Aim for as few moving pieces as possible to keep your code manageable and predictable.

### 4. Remove Any Non-Essential State Variables
Eliminate states that do not correspond to a valid UI state you want users to experience.

> **Key Evaluation Questions:**
> * *Does this state cause a paradox?*
> * *Is the same information already available in another state variable?*
> * *Can you derive this information from the inverse of another state variable?*

### 5. Connect the Event Handlers to Set the State
Wire event handlers (inputs, button clicks, API responses) directly to your state updater functions.


## Principles for Structuring State

When creating components with state, careful choices about data shape and state quantity prevent bugs. Apply these five core principles:

### 1. Group Related State
* If you consistently update two or more state variables together, consider merging them into a single state object.

### 2. Avoid Contradictions in State
* Designing state structures where variables can disagree creates bug opportunities. Ensure invalid combinations cannot exist in memory.

### 3. Avoid Redundant State
* If information can be calculated during rendering from existing props or state variables, **do not** place it in state.

### 4. Avoid Duplication in State
* Duplicating data across state variables or inside nested objects makes synchronization difficult. Keep data normalized and single-sourced.

### 5. Avoid Deeply Nested State
* Deeply hierarchical state is awkward and error-prone to update immutably. Prefer flat state structures whenever possible.