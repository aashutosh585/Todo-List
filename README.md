# 📝 Modern Todo List App

A beautiful, feature-rich todo list application built with React and Vite. Stay organized and boost your productivity with this intuitive task management tool.

## ✨ Features

### Core Functionality
- ✅ Add new tasks with ease
- ✏️ Edit tasks inline (double-click to edit)
- 🗑️ Delete individual tasks
- ☑️ Mark tasks as complete/incomplete
- 💾 Automatic local storage persistence

### Advanced Features
- 🏷️ Priority levels (High, Medium, Low) with color coding
- 🔍 Filter tasks by status (All, Active, Completed)
- 📊 Real-time progress tracking with visual progress bar
- 🧹 Bulk actions (Complete All, Clear Completed)
- 📈 Task statistics dashboard
- 🎨 Beautiful gradient UI with smooth animations
- 📱 Fully responsive design

### User Experience
- ⌨️ Keyboard shortcuts (Enter to add, Escape to cancel editing)
- 🎯 Intuitive interface
- 🌈 Color-coded priority indicators
- 📊 Progress visualization
- 💾 Data persistence across browser sessions

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## 🛠️ Technologies Used

- **React 19** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **CSS3** - Modern styling with gradients and animations
- **UUID** - Unique identifier generation
- **LocalStorage API** - Data persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── Todo.jsx          # Main todo component
│   └── Todo.css          # Todo component styles
├── App.jsx               # Root application component
├── App.css               # Application styles
├── index.css             # Global styles
└── main.jsx              # Application entry point
```

## 🎨 Features in Detail

### Priority System
Tasks can be assigned three priority levels:
- 🔴 **High Priority** - Urgent tasks that need immediate attention
- 🟡 **Medium Priority** - Important tasks with moderate urgency
- 🟢 **Low Priority** - Tasks that can be completed when time permits

### Filtering System
- **All** - View all tasks regardless of status
- **Active** - View only incomplete tasks
- **Completed** - View only completed tasks

### Progress Tracking
- Visual progress bar showing completion percentage
- Real-time statistics showing total, active, and completed tasks
- Motivational messages to encourage productivity

### Data Persistence
Your todos are automatically saved to your browser's local storage, so you won't lose your tasks when you close and reopen the app.

## ⌨️ Keyboard Shortcuts

- `Enter` - Add new task or save edit
- `Escape` - Cancel editing
- `Double-click` - Edit task text

## 🎯 Usage Tips

1. **Quick Add**: Type your task and press Enter to quickly add it
2. **Inline Editing**: Double-click any task to edit it in place
3. **Priority Management**: Use the priority dropdown to organize tasks by importance
4. **Bulk Operations**: Use "Complete All" or "Clear Completed" for efficient task management
5. **Filter Focus**: Use filters to focus on specific task types

---

Made with ❤️ using React and Vite
