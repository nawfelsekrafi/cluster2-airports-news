# News Management Application

A comprehensive news management system built with Angular 18 and Tailwind CSS, featuring a modern UI with dark mode support and responsive design.

## 🚀 Technologies Used

### Frontend Framework
- **Angular 18** - Latest version with standalone components
- **TypeScript** - Type-safe development
- **Angular Reactive Forms** - Form validation and management

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS Variables** - Dynamic theming support
- **SCSS** - Enhanced styling capabilities
- **Responsive Design** - Mobile-first approach

### Development Tools
- **Angular CLI** - Project scaffolding and build tools
- **Standalone Components** - Modern Angular architecture
- **RxJS** - Reactive programming

## ✨ Main Features

### 📰 News Management
- **Create News Posts** - Full-featured form with validation
- **Edit News Posts** - Modify existing articles
- **Delete News Posts** - Remove unwanted content
- **Archive/Unarchive** - Manage post visibility
- **Image Upload** - Featured image support with preview
- **HTML Content** - Rich text support for news articles

### 🎨 User Interface
- **Dark Mode Toggle** - System preference detection with manual override
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Multiple View Modes** - Cards and table layouts
- **Modern UI Components** - Clean and intuitive interface
- **Smooth Animations** - Enhanced user experience

### 🔍 Search & Filter
- **Real-time Search** - Search across titles and content
- **Filter Options** - All, Active, and Archived posts
- **Advanced Filtering** - Multiple criteria support
- **Pagination** - Efficient content browsing

### 📱 Modals & Interactions
- **News View Modal** - Full-screen article preview
- **Create/Edit Form** - Comprehensive news editor
- **Delete Confirmation** - Safe deletion with confirmation
- **Image Management** - Upload, preview, and remove images

### 🎯 Key Components
- **News List** - Main dashboard with grid/table views
- **News Cards** - Compact article previews
- **News Form** - Create/edit interface
- **News View Modal** - Full article display
- **Header** - Navigation with dark mode toggle
- **Delete Modal** - Confirmation dialogs

## 🛠️ Technical Features

### Architecture
- **Standalone Components** - Modern Angular 18 architecture
- **Component Communication** - Input/Output event handling
- **Reactive Forms** - Form validation and state management
- **TypeScript Interfaces** - Type safety throughout

### Responsive Design
- **Mobile-First** - Optimized for all screen sizes
- **Flexible Layouts** - Adaptive grid and flexbox
- **Touch-Friendly** - Mobile interaction support
- **Cross-Browser** - Compatible across modern browsers

## 📸 Screenshots

### Dashboard - Cards View
![News Dashboard Cards View](https://github.com/nawfelsekrafi/cluster2-airports-news/blob/main/public/demos/Screenshot%202025-07-06%20at%207.42.14%E2%80%AFPM.png?raw=true)
*Modern card-based layout with search, filter options, and responsive design*

### Dashboard - Table View
![News Dashboard Table View](https://github.com/nawfelsekrafi/cluster2-airports-news/blob/main/public/demos/Screenshot%202025-07-06%20at%207.41.52%E2%80%AFPM.png?raw=true)
*Comprehensive table view with sorting, pagination, and action buttons*

### Create/Edit News Form
![Create News Form](https://github.com/nawfelsekrafi/cluster2-airports-news/blob/main/public/demos/Screenshot%202025-07-06%20at%207.42.48%E2%80%AFPM.png?raw=true)
*Full-featured news creation form with image upload and validation*

### News View Modal
![News View Modal](https://github.com/nawfelsekrafi/cluster2-airports-news/blob/main/public/demos/Screenshot%202025-07-06%20at%207.42.00%E2%80%AFPM.png?raw=true )
*Responsive modal for viewing complete news articles with image and content*

### Dark Mode Support
![Dark Mode Interface](https://github.com/nawfelsekrafi/cluster2-airports-news/blob/main/public/demos/Screenshot%202025-07-06%20at%207.42.56%E2%80%AFPM.png?raw=true)
*Elegant dark theme with consistent styling across all components*


## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

### Installation
```bash
# Clone the repository
git clone https://github.com/nawfelsekrafi/cluster2-airports-news.git

# Navigate to project directory
cd cluster2-airports-news

# Install dependencies
npm install

# Start development server
ng serve
```

### Development Server
Navigate to `http://localhost:4200/` after running `ng serve`. The application will automatically reload when you make changes.

### Build
```bash
# Build for production
ng build

# Build artifacts will be stored in the `dist/` directory
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   ├── news-list/
│   │   ├── news-card/
│   │   ├── news-form/
│   │   ├── news-view-modal/
│   │   └── delete-modal/
│   ├── types/
│   ├── helpers/
│   └── styles/
├── assets/
└── public/
    └── icons/
```

## 🎨 Theme Support

The application supports both light and dark themes with:
- **System preference detection**
- **Manual theme switching**
- **Persistent theme storage**
- **Smooth theme transitions**
- **CSS variable-based theming**

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Development

### Code Scaffolding
```bash
ng generate component component-name
ng generate service service-name
ng generate interface interface-name
```

### Testing
```bash
# Run unit tests
ng test

# Run e2e tests
ng e2e
```
