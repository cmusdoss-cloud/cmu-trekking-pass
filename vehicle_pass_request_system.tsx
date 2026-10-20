import React, { useState, useEffect, useMemo } from 'react';
import { 
  Car, 
  Search, 
  PlusCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Printer, 
  QrCode, 
  Shield, 
  FileText, 
  Calendar, 
  User, 
  Building2, 
  Phone, 
  Fuel, 
  AlertTriangle, 
  Filter, 
  RefreshCw, 
  Lock, 
  Unlock, 
  SlidersHorizontal,
  ChevronRight,
  Download,
  Info,
  Check,
  Zap,
  Flame,
  Gauge,
  ExternalLink,
  Trash2,
  Edit,
  Sparkles,
  Mountain,
  Award,
  Settings,
  Plus,
  List,
  Layers,
  ArrowRight
} from 'lucide-react';

const INITIAL_ACTIVE_YEAR = '2569';
const INITIAL_YEARS = ['2569', '2568', '2567'];

const DEFAULT_DEPARTMENTS = [
  'คณะมนุษยศาสตร์',
  'คณะศึกษาศาสตร์',
  'คณะวิจิตรศิลป์',
  'คณะสังคมศาสตร์',
  'คณะวิทยาศาสตร์',
  'คณะวิศวกรรมศาสตร์',
  'คณะแพทยศาสตร์',
  'คณะเกษตรศาสตร์',
  'คณะทันตแพทยศาสตร์',
  'คณะเภสัชศาสตร์',
  'คณะเทคนิคการแพทย์',
  'คณะพยาบาลศาสตร์',
  'คณะอุตสาหกรรมเกษตร',
  'คณะสัตวแพทยศาสตร์',
  'คณะบริหารธุรกิจ',
  'คณะเศรษฐศาสตร์',
  'คณะสถาปัตยกรรมศาสตร์',
  'คณะการสื่อสารมวลชน',
  'คณะรัฐศาสตร์และรัฐประศาสนศาสตร์',
  'คณะนิติศาสตร์',
  'วิทยาลัยศิลปะ สื่อ และเทคโนโลยี (CAMT)',
  'วิทยาลัยการศึกษาตลอดชีวิต (Multidisciplinary System)',
  'สโมสรนักศึกษามหาวิทยาลัยเชียงใหม่ (สภ.มช.)',
  'สำนักงานมหาวิทยาลัย / ส่วนกลาง',
  'หน่วยงานภายนอก / เจ้าหน้าที่ตำรวจ-จราจร'
];

const DEFAULT_VEHICLE_TYPES = [
  'รถยนต์ส่วนบุคคล',
  'รถตู้',
  'รถกระบะ / บรรทุก',
  'รถจักรยานยนต์',
  'รถพยาบาล / ฉุกเฉิน',
  'รถบัส / สวัสดิการ',
  'รถสี่ล้อแดง / รถโดยสารสาธารณะ',
  'อื่นๆ'
];

const DEFAULT_FUEL_TYPES = [
  'เบนซิน',
  'ดีเซล',
  'ไฟฟ้า (EV)',
  'แก๊ส LPG/NGV',
  'ไฮบริด (Hybrid)'
];

const INITIAL_REQUESTS = [
  {
    id: 'PASS-2569-001',
    year: '2569',
    fullName: 'ผศ.ดร. สมชาย ใจดี',
    department: 'คณะวิศวกรรมศาสตร์',
    phone: '081-234-5678',
    plateNumber: 'กข 1234 เชียงใหม่',
    vehicleType: 'รถยนต์ส่วนบุคคล',
    fuelType: 'ไฟฟ้า (EV)',
    passengers: '4',
    purpose: 'รถเจ้าหน้าที่ประสานงานและดูแลความปลอดภัย',
    status: 'APPROVED',
    createdAt: '2026-09-10 09:30',
    approvedBy: 'แอดมินส่วนกลาง'
  },
  {
    id: 'PASS-2569-002',
    year: '2569',
    fullName: 'น.ส.วิภาดา รักดี',
    department: 'สโมสรนักศึกษามหาวิทยาลัยเชียงใหม่ (สภ.มช.)',
    phone: '089-876-5432',
    plateNumber: 'นข 5678 เชียงใหม่',
    vehicleType: 'รถตู้',
    fuelType: 'ดีเซล',
    passengers: '10',
    purpose: 'รับส่งนักศึกษาและอุปกรณ์ปฐมพยาบาล',
    status: 'APPROVED',
    createdAt: '2026-09-11 10:15',
    approvedBy: 'แอดมินส่วนกลาง'
  },
  {
    id: 'PASS-2569-003',
    year: '2569',
    fullName: 'นายธนกร สายสืบ',
    department: 'คณะการสื่อสารมวลชน',
    phone: '086-555-7788',
    plateNumber: 'ขก 4321 เชียงใหม่',
    vehicleType: 'รถยนต์ส่วนบุคคล',
    fuelType: 'เบนซิน',
    passengers: '3',
    purpose: 'ทีมงานช่างภาพและประชาสัมพันธ์งาน',
    status: 'PENDING',
    createdAt: '2026-09-15 11:20',
    approvedBy: '-'
  },
  {
    id: 'PASS-2568-001',
    year: '2568',
    fullName: 'ดร.อนันต์ สุขเสริฐ',
    department: 'คณะวิทยาศาสตร์',
    phone: '083-999-0000',
    plateNumber: 'ฮฮ 777 เชียงใหม่',
    vehicleType: 'รถยนต์ส่วนบุคคล',
    fuelType: 'แก๊ส LPG/NGV',
    passengers: '2',
    purpose: 'รถอาจารย์ดูแลนักศึกษาประจำจุดพัก',
    status: 'APPROVED',
    createdAt: '2025-09-01 08:00',
    approvedBy: 'แอดมินส่วนกลาง'
  }
];

export default function App() {
  // Navigation & User/Admin Modes
  const [isAdminMode, setIsAdminMode] = useState(false); // false = User View, true = Admin View
  const [userTab, setUserTab] = useState('FORM'); // 'FORM', 'CHECK_STATUS'
  const [adminTab, setAdminTab] = useState('REQUESTS'); // 'REQUESTS', 'FORM_FIELDS', 'SETTINGS'

  // Admin Custom Password State
  const [adminPassword, setAdminPassword] = useState('1234');
  const [newAdminPasswordInput, setNewAdminPasswordInput] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  // Registration System Status (Open / Closed for requests)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);

  // Master Data & Year Management
  const [activeYear, setActiveYear] = useState(INITIAL_ACTIVE_YEAR);
  const [selectedYear, setSelectedYear] = useState(INITIAL_ACTIVE_YEAR);
  const [availableYears, setAvailableYears] = useState(INITIAL_YEARS);
  
  // Customizable Form Options (Departments, Vehicle Types, Fuel Types)
  const [departments, setDepartments] = useState(DEFAULT_DEPARTMENTS);
  const [vehicleTypes, setVehicleTypes] = useState(DEFAULT_VEHICLE_TYPES);
  const [fuelTypes, setFuelTypes] = useState(DEFAULT_FUEL_TYPES);

  // Form Field Dynamic Editors State (Admin)
  const [editingDeptIndex, setEditingDeptIndex] = useState(null);
  const [editingDeptValue, setEditingDeptValue] = useState('');
  const [newDeptInput, setNewDeptInput] = useState('');

  const [editingVehicleIndex, setEditingVehicleIndex] = useState(null);
  const [editingVehicleValue, setEditingVehicleValue] = useState('');
  const [newVehicleInput, setNewVehicleInput] = useState('');

  const [editingFuelIndex, setEditingFuelIndex] = useState(null);
  const [editingFuelValue, setEditingFuelValue] = useState('');
  const [newFuelInput, setNewFuelInput] = useState('');

  // Requests Data State
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  // Form Data State (User Request)
  const [formData, setFormData] = useState({
    fullName: '',
    department: DEFAULT_DEPARTMENTS[0] || '',
    phone: '',
    plateNumber: '',
    vehicleType: DEFAULT_VEHICLE_TYPES[0] || '',
    fuelType: DEFAULT_FUEL_TYPES[0] || '',
    passengers: '1',
    purpose: ''
  });

  // Keep form data default values synced with state changes if empty
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      department: prev.department && departments.includes(prev.department) ? prev.department : (departments[0] || ''),
      vehicleType: prev.vehicleType && vehicleTypes.includes(prev.vehicleType) ? prev.vehicleType : (vehicleTypes[0] || ''),
      fuelType: prev.fuelType && fuelTypes.includes(prev.fuelType) ? prev.fuelType : (fuelTypes[0] || '')
    }));
  }, [departments, vehicleTypes, fuelTypes]);

  // Validation State
  const [duplicateError, setDuplicateError] = useState('');
  const [formSubmittedSuccess, setFormSubmittedSuccess] = useState(null);

  // Search State (User Check Status)
  const [searchPlate, setSearchPlate] = useState('');
  const [foundRequest, setFoundRequest] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Pass Modal View
  const [viewingPass, setViewingPass] = useState(null);

  // Admin Search & Filter States
  const [adminSearch, setAdminSearch] = useState('');
  const [adminStatusFilter, setAdminStatusFilter] = useState('ALL');
  const [adminDeptFilter, setAdminDeptFilter] = useState('ALL');
  const [adminFuelFilter, setAdminFuelFilter] = useState('ALL');
  
  // Modals
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [showAddYearModal, setShowAddYearModal] = useState(false);
  const [newYearInput, setNewYearInput] = useState('');

  // Duplicate Plate Check Helper
  const checkDuplicate = (plate, year) => {
    if (!plate.trim()) return false;
    const cleanPlate = plate.replace(/\s+/g, '').toLowerCase();
    return requests.some(r => 
      r.year === year && 
      r.plateNumber.replace(/\s+/g, '').toLowerCase() === cleanPlate &&
      r.status !== 'REJECTED'
    );
  };

  // Handle Form Change with Duplication Alert
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'plateNumber') {
      if (checkDuplicate(value, activeYear)) {
        setDuplicateError(`* เลขทะเบียน "${value}" มีการยื่นขอออกบัตรผ่านของปี พ.ศ. ${activeYear} อยู่ในระบบแล้ว`);
      } else {
        setDuplicateError('');
      }
    }
  };

  // Submit Application Form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (duplicateError) {
      alert('ไม่สามารถส่งข้อมูลได้ เนื่องจากเลขทะเบียนรถซ้ำในระบบ!');
      return;
    }

    if (!formData.fullName || !formData.phone || !formData.plateNumber || !formData.purpose || !formData.passengers) {
      alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      return;
    }

    const newPassId = `PASS-${activeYear}-${String(requests.filter(r => r.year === activeYear).length + 1).padStart(3, '0')}`;
    const newRequest = {
      id: newPassId,
      year: activeYear,
      ...formData,
      status: 'PENDING',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      approvedBy: '-'
    };

    setRequests([newRequest, ...requests]);
    setFormSubmittedSuccess(newRequest);
    
    // Reset Form
    setFormData({
      fullName: '',
      department: departments[0] || '',
      phone: '',
      plateNumber: '',
      vehicleType: vehicleTypes[0] || '',
      fuelType: fuelTypes[0] || '',
      passengers: '1',
      purpose: ''
    });
  };

  // Search Pass Status (User Mode)
  const handleSearchStatus = (e) => {
    e.preventDefault();
    if (!searchPlate.trim()) return;
    
    const cleanSearch = searchPlate.replace(/\s+/g, '').toLowerCase();
    const result = requests.find(r => 
      r.year === selectedYear && 
      r.plateNumber.replace(/\s+/g, '').toLowerCase() === cleanSearch
    );

    setFoundRequest(result || null);
    setHasSearched(true);
  };

  // Update Request Status (Admin)
  const handleUpdateStatus = (id, newStatus) => {
    setRequests(prev => prev.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status: newStatus,
          approvedBy: newStatus === 'APPROVED' ? 'ผู้ดูแลระบบ (Admin)' : '-'
        };
      }
      return r;
    }));
  };

  const handleDeleteRequest = (id) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการคำขอนี้?')) {
      setRequests(prev => prev.filter(r => r.id !== id));
    }
  };

  // Switch Admin Login/Logout
  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (adminPasswordInput === adminPassword || adminPasswordInput === 'admin') {
      setIsAdminMode(true);
      setShowAdminLoginModal(false);
      setAdminPasswordInput('');
    } else {
      alert('รหัสผ่านไม่ถูกต้อง!');
    }
  };

  // Change Admin Password Handler
  const handleChangeAdminPassword = (e) => {
    e.preventDefault();
    if (!newAdminPasswordInput.trim()) {
      alert('กรุณากรอกรหัสผ่านใหม่');
      return;
    }
    setAdminPassword(newAdminPasswordInput.trim());
    setNewAdminPasswordInput('');
    setPasswordChangeSuccess(true);
    setTimeout(() => setPasswordChangeSuccess(false), 3000);
  };

  // Add New Year
  const handleAddNewYear = () => {
    if (!newYearInput.trim()) return;
    const yearStr = newYearInput.trim();
    if (availableYears.includes(yearStr)) {
      alert('ปี พ.ศ. นี้มีในระบบอยู่แล้ว');
      return;
    }
    const updatedYears = [yearStr, ...availableYears];
    setAvailableYears(updatedYears);
    setSelectedYear(yearStr);
    setActiveYear(yearStr); // Set as active
    setNewYearInput('');
    setShowAddYearModal(false);
  };

  // --- DEPARTMENT MANAGEMENT ---
  const handleAddDepartment = () => {
    if (!newDeptInput.trim()) return;
    if (departments.includes(newDeptInput.trim())) {
      alert('มีชื่อหน่วยงาน/คณะนี้ในระบบอยู่แล้ว');
      return;
    }
    setDepartments([...departments, newDeptInput.trim()]);
    setNewDeptInput('');
  };

  const handleUpdateDepartment = (index) => {
    if (!editingDeptValue.trim()) return;
    const updated = [...departments];
    updated[index] = editingDeptValue.trim();
    setDepartments(updated);
    setEditingDeptIndex(null);
  };

  const handleDeleteDepartment = (index) => {
    if (departments.length <= 1) {
      alert('ต้องมีอย่างน้อย 1 หน่วยงาน/คณะในระบบ');
      return;
    }
    if (confirm(`คุณต้องการลบ "${departments[index]}" ออกจากรายการตัวเลือกใช่หรือไม่?`)) {
      setDepartments(departments.filter((_, i) => i !== index));
    }
  };

  // --- VEHICLE TYPE MANAGEMENT ---
  const handleAddVehicleType = () => {
    if (!newVehicleInput.trim()) return;
    if (vehicleTypes.includes(newVehicleInput.trim())) {
      alert('มีประเภทยานพาหนะนี้อยู่แล้ว');
      return;
    }
    setVehicleTypes([...vehicleTypes, newVehicleInput.trim()]);
    setNewVehicleInput('');
  };

  const handleUpdateVehicleType = (index) => {
    if (!editingVehicleValue.trim()) return;
    const updated = [...vehicleTypes];
    updated[index] = editingVehicleValue.trim();
    setVehicleTypes(updated);
    setEditingVehicleIndex(null);
  };

  const handleDeleteVehicleType = (index) => {
    if (vehicleTypes.length <= 1) {
      alert('ต้องมีอย่างน้อย 1 ประเภทยานพาหนะในระบบ');
      return;
    }
    if (confirm(`คุณต้องการลบ "${vehicleTypes[index]}" ออกใช่หรือไม่?`)) {
      setVehicleTypes(vehicleTypes.filter((_, i) => i !== index));
    }
  };

  // --- FUEL TYPE MANAGEMENT ---
  const handleAddFuelType = () => {
    if (!newFuelInput.trim()) return;
    if (fuelTypes.includes(newFuelInput.trim())) {
      alert('มีประเภทเชื้อเพลิงนี้อยู่แล้ว');
      return;
    }
    setFuelTypes([...fuelTypes, newFuelInput.trim()]);
    setNewFuelInput('');
  };

  const handleUpdateFuelType = (index) => {
    if (!editingFuelValue.trim()) return;
    const updated = [...fuelTypes];
    updated[index] = editingFuelValue.trim();
    setFuelTypes(updated);
    setEditingFuelIndex(null);
  };

  const handleDeleteFuelType = (index) => {
    if (fuelTypes.length <= 1) {
      alert('ต้องมีอย่างน้อย 1 ประเภทเชื้อเพลิงในระบบ');
      return;
    }
    if (confirm(`คุณต้องการลบ "${fuelTypes[index]}" ออกใช่หรือไม่?`)) {
      setFuelTypes(fuelTypes.filter((_, i) => i !== index));
    }
  };

  // Filtered Requests for Admin Table
  const filteredRequests = useMemo(() => {
    return requests.filter(r => {
      const matchYear = r.year === selectedYear;
      const matchStatus = adminStatusFilter === 'ALL' || r.status === adminStatusFilter;
      const matchDept = adminDeptFilter === 'ALL' || r.department === adminDeptFilter;
      const matchFuel = adminFuelFilter === 'ALL' || r.fuelType === adminFuelFilter;
      const matchQuery = !adminSearch.trim() || 
        r.fullName.toLowerCase().includes(adminSearch.toLowerCase()) ||
        r.plateNumber.toLowerCase().includes(adminSearch.toLowerCase()) ||
        r.id.toLowerCase().includes(adminSearch.toLowerCase()) ||
        r.phone.includes(adminSearch);

      return matchYear && matchStatus && matchDept && matchFuel && matchQuery;
    });
  }, [requests, selectedYear, adminStatusFilter, adminDeptFilter, adminFuelFilter, adminSearch]);

  // Statistics
  const stats = useMemo(() => {
    const yearReqs = requests.filter(r => r.year === selectedYear);
    return {
      total: yearReqs.length,
      approved: yearReqs.filter(r => r.status === 'APPROVED').length,
      pending: yearReqs.filter(r => r.status === 'PENDING').length,
      rejected: yearReqs.filter(r => r.status === 'REJECTED').length
    };
  }, [requests, selectedYear]);

  // Print Action
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col print:bg-white print:text-black">
      
      {/* ----------------- HEADER BAR ----------------- */}
      <header className="bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white shadow-lg print:hidden sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo / System Title */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { if(!isAdminMode) setUserTab('FORM'); }}>
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-purple-950 flex items-center justify-center font-bold shadow-lg border-2 border-amber-300 transform rotate-[-2deg]">
                <Mountain className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-black tracking-wide text-amber-300 drop-shadow flex items-center gap-2">
                  ระบบออกบัตรผ่านยานพาหนะ
                  {isAdminMode && (
                    <span className="bg-rose-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider border border-rose-400">
                      ADMIN PORTAL
                    </span>
                  )}
                </h1>
                <p className="text-xs text-purple-200 hidden sm:block">
                  งานประเพณีนำนักศึกษาใหม่ขึ้นไปนมัสการพระบรมธาตุดอยสุเทพ มหาวิทยาลัยเชียงใหม่
                </p>
              </div>
            </div>

            {/* Navigation Tabs Depending on Mode */}
            <div className="flex items-center space-x-2">
              {!isAdminMode ? (
                // --- USER MENU ---
                <nav className="flex items-center space-x-1 sm:space-x-2">
                  <button
                    onClick={() => { setUserTab('FORM'); setFormSubmittedSuccess(null); }}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center space-x-1.5 ${
                      userTab === 'FORM' 
                        ? 'bg-amber-400 text-purple-950 shadow-md' 
                        : 'text-purple-100 hover:bg-purple-800/60 hover:text-amber-300'
                    }`}
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>ยื่นคำขอรับบัตรผ่าน</span>
                  </button>

                  <button
                    onClick={() => setUserTab('CHECK_STATUS')}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center space-x-1.5 ${
                      userTab === 'CHECK_STATUS' 
                        ? 'bg-amber-400 text-purple-950 shadow-md' 
                        : 'text-purple-100 hover:bg-purple-800/60 hover:text-amber-300'
                    }`}
                  >
                    <Search className="w-4 h-4" />
                    <span>ค้นหา / พิมพ์บัตร</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('คัดลอกลิงก์หน้ายื่นคำขอเรียบร้อยแล้ว!');
                    }}
                    className="p-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-700/60 text-xs font-semibold flex items-center gap-1 transition"
                    title="คัดลอกลิงก์หน้านี้"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden lg:inline">คัดลอกลิงก์</span>
                  </button>

                  <button
                    onClick={() => setShowAdminLoginModal(true)}
                    className="ml-2 p-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-700/60 text-xs font-semibold flex items-center gap-1 transition"
                    title="สำหรับแอดมินเจ้าหน้าที่"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden lg:inline">เจ้าหน้าที่</span>
                  </button>
                </nav>
              ) : (
                // --- ADMIN MENU ---
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsAdminMode(false)}
                    className="px-3 py-1.5 bg-purple-800/80 hover:bg-purple-700 text-purple-200 rounded-xl text-xs font-medium flex items-center gap-1 border border-purple-600 transition"
                  >
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" /> หน้าหลักผู้ใช้งาน
                  </button>
                  <button
                    onClick={() => setIsAdminMode(false)}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow transition flex items-center gap-1"
                  >
                    <Lock className="w-3.5 h-3.5" /> ออกจากระบบ
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* SUB-HEADER / BANNER */}
      <div className="bg-purple-900 text-purple-100 py-2.5 px-4 text-center border-b border-amber-500/20 shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-medium mx-auto sm:mx-0">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" /> 
            <span>ประเพณีนำนักศึกษาใหม่ขึ้นไปนมัสการพระบรมธาตุดอยสุเทพ ประจำปี พ.ศ. <span className="text-amber-300 font-bold underline decoration-amber-400 underline-offset-4">{activeYear}</span></span>
          </div>

          {/* Registration Status Indicator / Control Banner */}
          <div className="hidden sm:flex items-center gap-3">
            <div className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1.5 border ${
              isRegistrationOpen 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isRegistrationOpen ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'}`}></span>
              {isRegistrationOpen ? 'เปิดรับลงทะเบียน' : 'ปิดรับลงทะเบียนชั่วคราว'}
            </div>

            {isAdminMode && (
              <div className="flex items-center gap-2 bg-purple-950/80 px-3 py-1 rounded-lg border border-purple-700 text-xs">
                <span className="text-purple-300">ประจำปี:</span>
                <span className="text-amber-300 font-bold">พ.ศ. {activeYear}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ----------------- MAIN CONTENT AREA ----------------- */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 print:p-0">

        {/* ========================================================= */}
        {/* =================== USER INTERFACE ====================== */}
        {/* ========================================================= */}
        {!isAdminMode && (
          <>
            {/* ---------------- USER TAB 1: FORM ---------------- */}
            {userTab === 'FORM' && (
              <div className="max-w-3xl mx-auto space-y-6">
                
                {/* SYSTEM CLOSED ALERT BANNER */}
                {!isRegistrationOpen ? (
                  <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-rose-200 text-center space-y-4">
                    <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                      <Lock className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold text-slate-800">ขณะนี้ระบบปิดรับคำขอออกบัตรผ่านชั่วคราว</h2>
                      <p className="text-xs text-slate-500">
                        การรับยื่นคำขอออกบัตรผ่านยานพาหนะประจำปี พ.ศ. {activeYear} ได้ถูกปิดระบบโดยผู้ดูแลระบบ หรือหมดระยะเวลาการยื่นคำขอแล้ว
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={() => setUserTab('CHECK_STATUS')}
                        className="px-6 py-2.5 bg-purple-950 hover:bg-purple-900 text-amber-300 text-xs font-bold rounded-xl shadow transition inline-flex items-center gap-2"
                      >
                        <Search className="w-4 h-4" /> ค้นหาและพิมพ์บัตรที่ได้รับการอนุมัติแล้ว
                      </button>
                    </div>
                  </div>
                ) : formSubmittedSuccess ? (
                  /* SUCCESS SUBMISSION SCREEN */
                  <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-t-8 border-emerald-500 text-center space-y-6 animate-fade-in">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-slate-800">ยื่นคำขอออกบัตรผ่านเรียบร้อยแล้ว!</h2>
                      <p className="text-slate-600 text-sm">
                        รหัสคำขอของคุณคือ: <span className="font-mono font-bold text-purple-950 text-lg px-3 py-1 bg-purple-50 rounded-lg border border-purple-200">{formSubmittedSuccess.id}</span>
                      </p>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-2xl text-left border border-slate-200 space-y-3 text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <p><span className="text-slate-500">ชื่อ-นามสกุล:</span> <strong className="text-slate-800">{formSubmittedSuccess.fullName}</strong></p>
                        <p><span className="text-slate-500">หน่วยงาน/คณะ:</span> <strong className="text-slate-800">{formSubmittedSuccess.department}</strong></p>
                        <p><span className="text-slate-500">ทะเบียนรถ:</span> <strong className="text-purple-900 font-bold bg-amber-100 px-2 py-0.5 rounded border border-amber-300">{formSubmittedSuccess.plateNumber}</strong></p>
                        <p><span className="text-slate-500">ประจำปี พ.ศ.:</span> <strong className="text-slate-800">{formSubmittedSuccess.year}</strong></p>
                      </div>
                      <div className="pt-3 border-t border-slate-200 flex items-center text-amber-800 bg-amber-50 p-3 rounded-xl text-xs font-medium">
                        <Info className="w-4 h-4 mr-2 shrink-0 text-amber-600" />
                        สถานะคำขอปัจจุบัน: <strong className="ml-1 text-amber-900 font-bold">รอการตรวจสอบจากเจ้าหน้าที่</strong> (นำเลขทะเบียนรถไปค้นหาเพื่อพิมพ์บัตรภายหลังการอนุมัติ)
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <button
                        onClick={() => setViewingPass(formSubmittedSuccess)}
                        className="px-6 py-3 bg-purple-950 hover:bg-purple-900 text-amber-300 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <FileText className="w-4 h-4" /> ดูตัวอย่างบัตรผ่าน
                      </button>
                      <button
                        onClick={() => setFormSubmittedSuccess(null)}
                        className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-all"
                      >
                        ยื่นคำขอเพิ่มอีกรายการ
                      </button>
                    </div>
                  </div>
                ) : (
                  /* REQUEST FORM CARD */
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
                    <div className="bg-gradient-to-r from-purple-950 to-indigo-950 p-6 sm:p-8 text-white border-b-4 border-amber-400">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-xl sm:text-2xl font-black text-amber-300 flex items-center gap-2.5">
                            <FileText className="w-7 h-7" /> แบบฟอร์มขอออกบัตรผ่านยานพาหนะ
                          </h2>
                          <p className="text-xs sm:text-sm text-purple-200 mt-1">
                            กรุณากรอกข้อมูลเพื่อขอรับบัตรผ่านขึ้นดอยสุเทพ ประจำปี พ.ศ. <span className="text-amber-300 font-bold">{activeYear}</span>
                          </p>
                        </div>
                        <div className="hidden sm:block text-right">
                          <span className="bg-amber-400 text-purple-950 text-xs font-black px-3.5 py-1.5 rounded-full shadow">
                            ประจำปี พ.ศ. {activeYear}
                          </span>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmitForm} className="p-6 sm:p-8 space-y-6">
                      
                      {/* DUPLICATE WARNING */}
                      {duplicateError && (
                        <div className="p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-2xl flex items-start space-x-3 text-rose-800 animate-pulse">
                          <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-bold text-sm">แจ้งเตือนข้อมูลซ้ำซ้อนในระบบ!</h4>
                            <p className="text-xs text-rose-700 mt-0.5">{duplicateError}</p>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Full Name */}
                        <div className="space-y-1.5">
                          <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                            <User className="w-4 h-4 text-purple-900" /> ชื่อ - นามสกุล <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="เช่น ผศ.ดร. สมชาย ใจดี"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none text-sm transition"
                          />
                        </div>

                        {/* Department / Faculty Dynamic Dropdown */}
                        <div className="space-y-1.5">
                          <label className="block text-sm font-semibold text-slate-700 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <Building2 className="w-4 h-4 text-purple-900" /> หน่วยงาน / คณะ / สังกัด <span className="text-rose-500">*</span>
                            </span>
                          </label>
                          <select
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none text-sm transition bg-white"
                          >
                            {departments.map(dept => (
                              <option key={dept} value={dept}>{dept}</option>
                            ))}
                          </select>
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                          <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                            <Phone className="w-4 h-4 text-purple-900" /> หมายเลขโทรศัพท์ <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="เช่น 081-234-5678"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none text-sm transition"
                          />
                        </div>

                        {/* Vehicle Plate Number */}
                        <div className="space-y-1.5">
                          <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                            <Car className="w-4 h-4 text-purple-900" /> เลขทะเบียนรถ <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="plateNumber"
                            value={formData.plateNumber}
                            onChange={handleInputChange}
                            placeholder="เช่น กข 1234 เชียงใหม่"
                            required
                            className={`w-full px-4 py-3 rounded-xl border font-bold text-slate-800 outline-none text-sm transition ${
                              duplicateError 
                                ? 'border-rose-500 bg-rose-50/50 focus:ring-2 focus:ring-rose-500' 
                                : 'border-slate-300 focus:ring-2 focus:ring-purple-600 focus:border-purple-600'
                            }`}
                          />
                        </div>

                        {/* Vehicle Type Dynamic Dropdown */}
                        <div className="space-y-1.5">
                          <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                            <Gauge className="w-4 h-4 text-purple-900" /> ประเภทยานพาหนะ <span className="text-rose-500">*</span>
                          </label>
                          <select
                            name="vehicleType"
                            value={formData.vehicleType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none text-sm transition bg-white"
                          >
                            {vehicleTypes.map(vt => (
                              <option key={vt} value={vt}>{vt}</option>
                            ))}
                          </select>
                        </div>

                        {/* Fuel Type Dynamic Dropdown */}
                        <div className="space-y-1.5">
                          <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                            <Fuel className="w-4 h-4 text-purple-900" /> ประเภทเชื้อเพลิง <span className="text-rose-500">*</span>
                          </label>
                          <select
                            name="fuelType"
                            value={formData.fuelType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none text-sm transition bg-white font-medium"
                          >
                            {fuelTypes.map(ft => (
                              <option key={ft} value={ft}>{ft}</option>
                            ))}
                          </select>
                        </div>

                        {/* Passenger Count */}
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="block text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                            <User className="w-4 h-4 text-purple-900" /> จำนวนผู้โดยสารในรถ (คน) รวมคนขับ <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="100"
                            name="passengers"
                            value={formData.passengers}
                            onChange={handleInputChange}
                            placeholder="ระบุจำนวนผู้โดยสาร เช่น 4"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none text-sm transition"
                          />
                        </div>

                      </div>

                      {/* Purpose */}
                      <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-700">
                          วัตถุประสงค์ในการขอใช้ยานพาหนะขึ้นดอยสุเทพ <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                          name="purpose"
                          rows="3"
                          value={formData.purpose}
                          onChange={handleInputChange}
                          placeholder="ระบุวัตถุประสงค์ เช่น รถขนส่งสัมภาระนักศึกษาประจำคณะ, รถสวัสดิการพยาบาล, รถสื่อสารมวลชน"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none text-sm transition"
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-slate-500">
                          * ตรวจสอบข้อมูลให้ถูกต้องก่อนส่งคำขอออกบัตรผ่านประจำปี พ.ศ. {activeYear}
                        </p>
                        <button
                          type="submit"
                          disabled={!!duplicateError}
                          className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                            duplicateError 
                              ? 'bg-slate-400 cursor-not-allowed shadow-none' 
                              : 'bg-gradient-to-r from-purple-950 to-indigo-950 hover:from-purple-900 hover:to-indigo-900 hover:shadow-xl active:scale-[0.98]'
                          }`}
                        >
                          <Check className="w-5 h-5 text-amber-400" />
                          ส่งข้อมูลขอออกบัตรผ่าน
                        </button>
                      </div>

                    </form>
                  </div>
                )}
              </div>
            )}

            {}
            {/* ---------------- USER TAB 2: CHECK STATUS ---------------- */}
            {userTab === 'CHECK_STATUS' && (
              <div className="max-w-3xl mx-auto space-y-6">
                
                {/* SEARCH CARD */}
                <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 border border-slate-200">
                  <div className="text-center max-w-md mx-auto space-y-2 mb-6">
                    <div className="w-12 h-12 bg-purple-100 text-purple-950 rounded-2xl flex items-center justify-center mx-auto">
                      <Search className="w-6 h-6 text-purple-900" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">ค้นหา / ตรวจสอบสถานะบัตรผ่าน</h2>
                    <p className="text-xs text-slate-500">
                      กรอกเลขทะเบียนรถของคุณเพื่อค้นหาคำขอออกบัตรผ่านประจำปี พ.ศ. <span className="font-bold text-purple-950">{selectedYear}</span>
                    </p>
                  </div>

                  {/* Year selector for public search */}
                  <div className="flex items-center justify-center space-x-2 mb-4 bg-slate-100 p-1.5 rounded-xl max-w-xs mx-auto">
                    <span className="text-xs font-semibold text-slate-600">เลือกปี พ.ศ.:</span>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="bg-white text-purple-950 font-bold rounded-lg px-2.5 py-1 text-xs border border-slate-300 outline-none"
                    >
                      {availableYears.map(yr => (
                        <option key={yr} value={yr}>พ.ศ. {yr}</option>
                      ))}
                    </select>
                  </div>

                  <form onSubmit={handleSearchStatus} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                    <div className="relative flex-1">
                      <Car className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={searchPlate}
                        onChange={(e) => setSearchPlate(e.target.value)}
                        placeholder="กรอกเลขทะเบียนรถ เช่น กข 1234"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 outline-none font-semibold text-slate-800"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-purple-950 hover:bg-purple-900 text-amber-300 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Search className="w-4 h-4" /> ค้นหา
                    </button>
                  </form>
                </div>

                {/* SEARCH RESULT DISPLAY */}
                {hasSearched && (
                  <div className="animate-fade-in">
                    {foundRequest ? (
                      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
                        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <span className="text-xs font-bold text-purple-900 bg-purple-100 px-3 py-1 rounded-full">
                              รหัสคำขอ: {foundRequest.id}
                            </span>
                            <h3 className="text-2xl font-black text-slate-800 mt-2">
                              {foundRequest.plateNumber}
                            </h3>
                            <p className="text-xs text-slate-500">ยื่นคำขอเมื่อ: {foundRequest.createdAt}</p>
                          </div>

                          {/* Status Badge */}
                          <div>
                            {foundRequest.status === 'APPROVED' && (
                              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> อนุมัติแล้ว
                              </span>
                            )}
                            {foundRequest.status === 'PENDING' && (
                              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                                <Clock className="w-4 h-4 text-amber-600" /> รอการตรวจสอบอนุมัติ
                              </span>
                            )}
                            {foundRequest.status === 'REJECTED' && (
                              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                                <XCircle className="w-4 h-4 text-rose-600" /> ไม่อนุมัติ
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="p-6 bg-slate-50/50 space-y-4 text-sm">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-slate-400">ผู้ขอบัตร</p>
                              <p className="font-semibold text-slate-800">{foundRequest.fullName}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400">หน่วยงาน / คณะ</p>
                              <p className="font-semibold text-slate-800">{foundRequest.department}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400">ประเภทยานพาหนะ / เชื้อเพลิง</p>
                              <p className="font-semibold text-slate-800">{foundRequest.vehicleType} ({foundRequest.fuelType})</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400">จำนวนผู้โดยสารในรถ</p>
                              <p className="font-semibold text-purple-950">{foundRequest.passengers || '-'} คน</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400">เบอร์โทรศัพท์</p>
                              <p className="font-semibold text-slate-800">{foundRequest.phone}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-slate-400">วัตถุประสงค์</p>
                            <p className="text-slate-700 bg-white p-3 rounded-xl border border-slate-200 mt-1">
                              {foundRequest.purpose}
                            </p>
                          </div>

                          {/* Print Pass Button */}
                          {foundRequest.status === 'APPROVED' && (
                            <div className="pt-4 flex justify-end">
                              <button
                                onClick={() => setViewingPass(foundRequest)}
                                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-950 to-indigo-950 hover:from-purple-900 hover:to-indigo-900 text-amber-300 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                              >
                                <QrCode className="w-4 h-4 text-amber-400" /> แสดง / พิมพ์บัตรผ่านยานพาหนะ (Digital Pass)
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 text-slate-500 space-y-2">
                        <XCircle className="w-10 h-10 text-slate-300 mx-auto" />
                        <p className="font-semibold text-slate-700">ไม่พบข้อมูลคำขอสำหรับเลขทะเบียน "{searchPlate}" ในปี พ.ศ. {selectedYear}</p>
                        <p className="text-xs text-slate-400">กรุณาตรวจสอบเลขทะเบียน หรือเลือกสลับปี พ.ศ. ให้ถูกต้อง</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {}
        {/* ========================================================= */}
        {/* =================== ADMIN PORTAL UI ===================== */}
        {/* ========================================================= */}
        {isAdminMode && (
          <div className="space-y-6 animate-fade-in">
            
            {/* ADMIN NAVIGATION & CONTROLS HEADER */}
            <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-md border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-950 text-amber-300 rounded-2xl shadow">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">แผงควบคุมผู้ดูแลระบบ (Admin Dashboard)</h2>
                  <p className="text-xs text-slate-500">จัดการการออกบัตรผ่าน ตั้งค่าระบบ ปิด/เปิดรับคำขอ และเปลี่ยนรหัสผ่าน</p>
                </div>
              </div>

              {/* Admin Navigation Tabs */}
              <div className="flex items-center bg-slate-100 p-1 rounded-2xl space-x-1 text-xs font-bold">
                <button
                  onClick={() => setAdminTab('REQUESTS')}
                  className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                    adminTab === 'REQUESTS' ? 'bg-purple-950 text-amber-300 shadow' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <List className="w-4 h-4" /> รายการคำขอ
                </button>
                <button
                  onClick={() => setAdminTab('FORM_FIELDS')}
                  className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                    adminTab === 'FORM_FIELDS' ? 'bg-purple-950 text-amber-300 shadow' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Settings className="w-4 h-4" /> ตั้งค่าแบบฟอร์ม
                </button>
                <button
                  onClick={() => setAdminTab('SETTINGS')}
                  className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                    adminTab === 'SETTINGS' ? 'bg-purple-950 text-amber-300 shadow' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Lock className="w-4 h-4" /> ตั้งค่าระบบ & รหัสผ่าน
                </button>
              </div>
            </div>

            {/* ---------------- ADMIN TAB 1: REQUESTS MANAGEMENT ---------------- */}
            {adminTab === 'REQUESTS' && (
              <div className="space-y-6">
                {/* SYSTEM REGISTRATION STATUS QUICK CONTROLLER BAR */}
                <div className={`p-4 rounded-2xl border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 ${
                  isRegistrationOpen 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl font-bold ${
                      isRegistrationOpen ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'
                    }`}>
                      {isRegistrationOpen ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">
                        สถานะระบบยื่นคำขอ: <span className="underline">{isRegistrationOpen ? 'เปิดรับลงทะเบียนอยู่ในขณะนี้' : 'ปิดรับลงทะเบียนชั่วคราว'}</span>
                      </h4>
                      <p className="text-xs opacity-80">
                        {isRegistrationOpen 
                          ? 'ผู้ใช้งานสามารถเข้ามากรอกแบบฟอร์มเพื่อส่งคำขอได้ตามปกติ' 
                          : 'ผู้ใช้งานจะไม่สามารถยื่นคำขอใหม่ได้ (จะเห็นป้ายเตือนปิดรับคำขอ)'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsRegistrationOpen(!isRegistrationOpen)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold shadow transition flex items-center gap-2 shrink-0 ${
                      isRegistrationOpen
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    {isRegistrationOpen ? (
                      <><Lock className="w-4 h-4" /> ปิดการรับคำขอออกบัตรผ่าน</>
                    ) : (
                      <><Unlock className="w-4 h-4" /> เปิดการรับคำขอออกบัตรผ่าน</>
                    )}
                  </button>
                </div>

                {/* STATS & YEAR SELECTION */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Total */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">คำขอทั้งหมด</p>
                      <p className="text-2xl font-extrabold text-slate-800 mt-0.5">{stats.total}</p>
                    </div>
                    <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center font-bold">
                      <FileText className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Approved */}
                  <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-xs text-emerald-600 font-medium">อนุมัติแล้ว</p>
                      <p className="text-2xl font-extrabold text-emerald-700 mt-0.5">{stats.approved}</p>
                    </div>
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Pending */}
                  <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-xs text-amber-600 font-medium">รอการอนุมัติ</p>
                      <p className="text-2xl font-extrabold text-amber-700 mt-0.5">{stats.pending}</p>
                    </div>
                    <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center font-bold">
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Rejected */}
                  <div className="bg-white p-4 rounded-2xl border border-rose-200 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-xs text-rose-600 font-medium">ไม่อนุมัติ</p>
                      <p className="text-2xl font-extrabold text-rose-700 mt-0.5">{stats.rejected}</p>
                    </div>
                    <div className="w-10 h-10 bg-rose-100 text-rose-700 rounded-xl flex items-center justify-center font-bold">
                      <XCircle className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Active Year Settings Card */}
                  <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-purple-950 to-indigo-950 p-4 rounded-2xl text-white shadow-md flex items-center justify-between">
                    <div>
                      <p className="text-xs text-purple-200">ปีเปิดรับคำขอในระบบ</p>
                      <p className="text-sm font-black text-amber-300 mt-0.5">พ.ศ. {activeYear}</p>
                    </div>
                    <button
                      onClick={() => setShowAddYearModal(true)}
                      className="px-3 py-1.5 bg-amber-400 text-purple-950 font-bold rounded-xl text-xs hover:bg-amber-300 transition shadow flex items-center gap-1"
                    >
                      <PlusCircle className="w-3.5 h-3.5" /> เพิ่มปี
                    </button>
                  </div>
                </div>

                {/* SEARCH & FILTERS BAR */}
                <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                    
                    {/* Filter Year Selector */}
                    <div className="flex items-center space-x-2 bg-slate-100 p-2 rounded-xl text-xs">
                      <Calendar className="w-4 h-4 text-purple-900 ml-1" />
                      <span className="font-semibold text-slate-600">แสดงคำขอปี พ.ศ.:</span>
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="bg-white text-purple-950 font-bold rounded-lg px-2.5 py-1 text-xs border border-slate-300 outline-none"
                      >
                        {availableYears.map(yr => (
                          <option key={yr} value={yr}>พ.ศ. {yr}</option>
                        ))}
                      </select>
                    </div>

                    {/* Search Field */}
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="text"
                        value={adminSearch}
                        onChange={(e) => setAdminSearch(e.target.value)}
                        placeholder="ค้นหาชื่อ, เลขทะเบียน, รหัสคำขอ, หรือเบอร์โทร..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-600 outline-none"
                      />
                    </div>

                    {/* Filters Dropdowns */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      <select
                        value={adminStatusFilter}
                        onChange={(e) => setAdminStatusFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-700 outline-none focus:ring-2 focus:ring-purple-600"
                      >
                        <option value="ALL">สถานะทั้งหมด</option>
                        <option value="APPROVED">อนุมัติแล้ว</option>
                        <option value="PENDING">รออนุมัติ</option>
                        <option value="REJECTED">ไม่อนุมัติ</option>
                      </select>

                      <select
                        value={adminFuelFilter}
                        onChange={(e) => setAdminFuelFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-700 outline-none focus:ring-2 focus:ring-purple-600"
                      >
                        <option value="ALL">เชื้อเพลิงทั้งหมด</option>
                        {fuelTypes.map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>

                      <select
                        value={adminDeptFilter}
                        onChange={(e) => setAdminDeptFilter(e.target.value)}
                        className="col-span-2 sm:col-span-1 px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-700 outline-none focus:ring-2 focus:ring-purple-600 truncate"
                      >
                        <option value="ALL">ทุกหน่วยงาน/คณะ</option>
                        {departments.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                  </div>
                </div>

                {/* TABLE OF REQUESTS */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-purple-900" />
                      รายการคำขอออกบัตรผ่าน ประจำปี พ.ศ. {selectedYear} ({filteredRequests.length} รายการ)
                    </h3>
                  </div>

                  {filteredRequests.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-slate-700">
                        <thead className="bg-slate-100 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                          <tr>
                            <th className="px-4 py-3.5">รหัสคำขอ</th>
                            <th className="px-4 py-3.5">เลขทะเบียนรถ</th>
                            <th className="px-4 py-3.5">ผู้ขอบัตร / สังกัด</th>
                            <th className="px-4 py-3.5">ประเภท / เชื้อเพลิง</th>
                            <th className="px-4 py-3.5">สถานะ</th>
                            <th className="px-4 py-3.5 text-center">จัดการคำขอ</th>
                            <th className="px-4 py-3.5 text-right">บัตรผ่าน</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-normal">
                          {filteredRequests.map((req) => (
                            <tr key={req.id} className="hover:bg-purple-50/40 transition">
                              <td className="px-4 py-3 font-mono font-bold text-xs text-purple-950">
                                {req.id}
                              </td>
                              <td className="px-4 py-3">
                                <span className="font-bold text-purple-950 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300 text-xs inline-block">
                                  {req.plateNumber}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="font-semibold text-slate-900">{req.fullName}</div>
                                <div className="text-xs text-slate-500">{req.department} • {req.phone}</div>
                              </td>
                              <td className="px-4 py-3 text-xs">
                                <div>{req.vehicleType} ({req.fuelType})</div>
                                <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-bold">
                                  {req.passengers || '1'} คน
                                </span>
                              </td>
                              <td className="px-4 py-3 text-xs">
                                {req.status === 'APPROVED' && (
                                  <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> อนุมัติแล้ว
                                  </span>
                                )}
                                {req.status === 'PENDING' && (
                                  <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                                    <Clock className="w-3.5 h-3.5" /> รอการพิจารณา
                                  </span>
                                )}
                                {req.status === 'REJECTED' && (
                                  <span className="inline-flex items-center gap-1 font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                                    <XCircle className="w-3.5 h-3.5" /> ไม่อนุมัติ
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <div className="flex items-center justify-center space-x-1">
                                  {req.status !== 'APPROVED' && (
                                    <button
                                      onClick={() => handleUpdateStatus(req.id, 'APPROVED')}
                                      title="อนุมัติคำขอ"
                                      className="p-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg transition"
                                    >
                                      <Check className="w-4 h-4" />
                                    </button>
                                  )}
                                  {req.status !== 'REJECTED' && (
                                    <button
                                      onClick={() => handleUpdateStatus(req.id, 'REJECTED')}
                                      title="ปฏิเสธคำขอ"
                                      className="p-1.5 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-lg transition"
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleDeleteRequest(req.id)}
                                    title="ลบรายการ"
                                    className="p-1.5 bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-rose-600 rounded-lg transition"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-right">
                                {req.status === 'APPROVED' ? (
                                  <button
                                    onClick={() => setViewingPass(req)}
                                    className="px-3 py-1.5 bg-purple-950 hover:bg-purple-900 text-amber-300 rounded-lg font-semibold text-xs transition flex items-center justify-center gap-1 ml-auto"
                                  >
                                    <QrCode className="w-3.5 h-3.5" /> พิมพ์บัตร
                                  </button>
                                ) : (
                                  <span className="text-xs text-slate-300 italic">-</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-12 text-center text-slate-400 text-sm">
                      ไม่พบข้อมูลคำขอออกบัตรผ่านตามเงื่อนไขที่เลือก
                    </div>
                  )}
                </div>

              </div>
            )}

            {}
            {/* ---------------- ADMIN TAB 2: DYNAMIC FORM FIELDS MANAGER ---------------- */}
            {adminTab === 'FORM_FIELDS' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 1. DEPARTMENTS / FACULTIES MANAGER */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-purple-900" />
                      รายการคณะ / หน่วยงาน ({departments.length})
                    </h3>
                  </div>

                  {/* Add New Department Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newDeptInput}
                      onChange={(e) => setNewDeptInput(e.target.value)}
                      placeholder="เพิ่มชื่อคณะ / หน่วยงานใหม่..."
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-600 outline-none"
                    />
                    <button
                      onClick={handleAddDepartment}
                      className="px-3 py-2 bg-purple-950 hover:bg-purple-900 text-amber-300 font-bold rounded-xl text-xs transition flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> เพิ่ม
                    </button>
                  </div>

                  {/* Department List with Edit/Delete */}
                  <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
                    {departments.map((dept, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 hover:bg-purple-50/50 rounded-xl border border-slate-200 flex items-center justify-between text-xs transition">
                        {editingDeptIndex === idx ? (
                          <div className="flex items-center gap-1.5 w-full">
                            <input
                              type="text"
                              value={editingDeptValue}
                              onChange={(e) => setEditingDeptValue(e.target.value)}
                              className="flex-1 px-2 py-1 rounded border border-purple-400 text-xs outline-none"
                            />
                            <button
                              onClick={() => handleUpdateDepartment(idx)}
                              className="px-2 py-1 bg-emerald-600 text-white rounded font-bold text-[10px]"
                            >
                              บันทึก
                            </button>
                            <button
                              onClick={() => setEditingDeptIndex(null)}
                              className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-[10px]"
                            >
                              ยกเลิก
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="font-medium text-slate-800 truncate pr-2">{dept}</span>
                            <div className="flex items-center space-x-1 shrink-0">
                              <button
                                onClick={() => { setEditingDeptIndex(idx); setEditingDeptValue(dept); }}
                                className="p-1 hover:bg-slate-200 text-slate-600 rounded"
                                title="แก้ไข"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteDepartment(idx)}
                                className="p-1 hover:bg-rose-100 text-rose-600 rounded"
                                title="ลบ"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. VEHICLE TYPES MANAGER */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-purple-900" />
                      ประเภทยานพาหนะ ({vehicleTypes.length})
                    </h3>
                  </div>

                  {/* Add New Vehicle Type Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newVehicleInput}
                      onChange={(e) => setNewVehicleInput(e.target.value)}
                      placeholder="เพิ่มประเภทยานพาหนะ..."
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-600 outline-none"
                    />
                    <button
                      onClick={handleAddVehicleType}
                      className="px-3 py-2 bg-purple-950 hover:bg-purple-900 text-amber-300 font-bold rounded-xl text-xs transition flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> เพิ่ม
                    </button>
                  </div>

                  {/* Vehicle List */}
                  <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
                    {vehicleTypes.map((vType, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 hover:bg-purple-50/50 rounded-xl border border-slate-200 flex items-center justify-between text-xs transition">
                        {editingVehicleIndex === idx ? (
                          <div className="flex items-center gap-1.5 w-full">
                            <input
                              type="text"
                              value={editingVehicleValue}
                              onChange={(e) => setEditingVehicleValue(e.target.value)}
                              className="flex-1 px-2 py-1 rounded border border-purple-400 text-xs outline-none"
                            />
                            <button
                              onClick={() => handleUpdateVehicleType(idx)}
                              className="px-2 py-1 bg-emerald-600 text-white rounded font-bold text-[10px]"
                            >
                              บันทึก
                            </button>
                            <button
                              onClick={() => setEditingVehicleIndex(null)}
                              className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-[10px]"
                            >
                              ยกเลิก
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="font-medium text-slate-800 truncate pr-2">{vType}</span>
                            <div className="flex items-center space-x-1 shrink-0">
                              <button
                                onClick={() => { setEditingVehicleIndex(idx); setEditingVehicleValue(vType); }}
                                className="p-1 hover:bg-slate-200 text-slate-600 rounded"
                                title="แก้ไข"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteVehicleType(idx)}
                                className="p-1 hover:bg-rose-100 text-rose-600 rounded"
                                title="ลบ"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. FUEL TYPES MANAGER */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-purple-900" />
                      ประเภทเชื้อเพลิง ({fuelTypes.length})
                    </h3>
                  </div>

                  {/* Add New Fuel Type Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFuelInput}
                      onChange={(e) => setNewFuelInput(e.target.value)}
                      placeholder="เพิ่มประเภทเชื้อเพลิง..."
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-600 outline-none"
                    />
                    <button
                      onClick={handleAddFuelType}
                      className="px-3 py-2 bg-purple-950 hover:bg-purple-900 text-amber-300 font-bold rounded-xl text-xs transition flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> เพิ่ม
                    </button>
                  </div>

                  {/* Fuel List */}
                  <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
                    {fuelTypes.map((fType, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 hover:bg-purple-50/50 rounded-xl border border-slate-200 flex items-center justify-between text-xs transition">
                        {editingFuelIndex === idx ? (
                          <div className="flex items-center gap-1.5 w-full">
                            <input
                              type="text"
                              value={editingFuelValue}
                              onChange={(e) => setEditingFuelValue(e.target.value)}
                              className="flex-1 px-2 py-1 rounded border border-purple-400 text-xs outline-none"
                            />
                            <button
                              onClick={() => handleUpdateFuelType(idx)}
                              className="px-2 py-1 bg-emerald-600 text-white rounded font-bold text-[10px]"
                            >
                              บันทึก
                            </button>
                            <button
                              onClick={() => setEditingFuelIndex(null)}
                              className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-[10px]"
                            >
                              ยกเลิก
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="font-medium text-slate-800 truncate pr-2">{fType}</span>
                            <div className="flex items-center space-x-1 shrink-0">
                              <button
                                onClick={() => { setEditingFuelIndex(idx); setEditingFuelValue(fType); }}
                                className="p-1 hover:bg-slate-200 text-slate-600 rounded"
                                title="แก้ไข"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteFuelType(idx)}
                                className="p-1 hover:bg-rose-100 text-rose-600 rounded"
                                title="ลบ"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ---------------- ADMIN TAB 3: SYSTEM SETTINGS & SECURITY ---------------- */}
            {adminTab === 'SETTINGS' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. TOGGLE REGISTRATION SWITCH CARD */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-purple-900" />
                      เปิด / ปิด การรับคำขอออกบัตรผ่าน
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    คุณสามารถสลับสถานะการเปิดรับสมัคร เพื่อควบคุมไม่ให้ผู้ใช้งานทั่วไปยื่นคำขอใหม่เข้ามาเพิ่มเติมในระบบ
                  </p>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-slate-800">สถานะระบบยื่นคำขอ</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {isRegistrationOpen ? 'กำลังเปิดรับคำขออยู่ในขณะนี้' : 'ปิดการรับคำขอแล้ว'}
                      </p>
                    </div>

                    <button
                      onClick={() => setIsRegistrationOpen(!isRegistrationOpen)}
                      className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isRegistrationOpen ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          isRegistrationOpen ? 'translate-x-7' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* 2. CHANGE ADMIN PASSWORD CARD */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                      <Lock className="w-4 h-4 text-purple-900" />
                      ตั้งค่ารหัสผ่านเข้าหน้าแอดมิน
                    </h3>
                  </div>

                  {passwordChangeSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> บันทึกรหัสผ่านใหม่เรียบร้อยแล้ว!
                    </div>
                  )}

                  <form onSubmit={handleChangeAdminPassword} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        รหัสผ่านปัจจุบันในระบบ:
                      </label>
                      <input
                        type="text"
                        disabled
                        value={adminPassword}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 text-xs font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        ระบุรหัสผ่านใหม่ที่ต้องการ:
                      </label>
                      <input
                        type="password"
                        value={newAdminPasswordInput}
                        onChange={(e) => setNewAdminPasswordInput(e.target.value)}
                        placeholder="กรอกรหัสผ่านใหม่..."
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 outline-none text-xs font-bold"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-purple-950 hover:bg-purple-900 text-amber-300 font-bold rounded-xl text-xs shadow transition flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4" /> บันทึกรหัสผ่านใหม่
                    </button>
                  </form>
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* ----------------- MODAL: DIGITAL PASS VIEW (PRINTABLE) ----------------- */}
      {viewingPass && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:fixed print:inset-0">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-4 border-amber-400 print:border-4 print:shadow-none print:max-w-none print:w-full">
            
            {/* Modal Controls */}
            <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between print:hidden">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Award className="w-4 h-4" /> พิมพ์บัตรผ่านยานพาหนะ CMU DIGITAL PASS
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-purple-950 font-bold rounded-xl text-xs transition flex items-center gap-1 shadow"
                >
                  <Printer className="w-3.5 h-3.5" /> พิมพ์บัตร (Print)
                </button>
                <button
                  onClick={() => setViewingPass(null)}
                  className="p-1 hover:bg-slate-800 text-slate-300 rounded-lg text-xs"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PASS BADGE DESIGN */}
            <div className="p-6 bg-gradient-to-b from-purple-950 via-purple-900 to-indigo-950 text-white relative border-b-8 border-amber-400">
              
              <div className="absolute right-3 bottom-3 opacity-10 pointer-events-none text-amber-300">
                <Mountain className="w-48 h-48" />
              </div>

              {/* Pass Badge Header */}
              <div className="text-center space-y-1 relative z-10 border-b border-purple-700/60 pb-4">
                <div className="inline-block bg-amber-400 text-purple-950 font-black text-xs px-3 py-0.5 rounded-full uppercase tracking-wider mb-1 shadow">
                  บัตรอนุญาตผ่านทาง ประจำปี พ.ศ. {viewingPass.year}
                </div>
                <h2 className="text-lg sm:text-xl font-black text-amber-300 tracking-wide drop-shadow">
                  ประเพณีนำนักศึกษาใหม่ขึ้นไปนมัสการพระบรมธาตุดอยสุเทพ
                </h2>
                <p className="text-xs text-purple-200">มหาวิทยาลัยเชียงใหม่ (CMU Doi Suthep Pass)</p>
              </div>

              {/* Plate Number Box */}
              <div className="my-5 text-center relative z-10">
                <div className="inline-block bg-slate-100 text-purple-950 px-6 py-3 rounded-2xl border-4 border-amber-400 shadow-xl">
                  <p className="text-[11px] text-slate-500 font-bold tracking-widest uppercase">เลขทะเบียนรถที่ได้รับอนุญาต</p>
                  <p className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mt-0.5">
                    {viewingPass.plateNumber}
                  </p>
                </div>
              </div>

              {/* Details List */}
              <div className="bg-purple-900/80 backdrop-blur-md rounded-2xl p-4 border border-purple-700/60 text-xs space-y-2 relative z-10">
                <div className="flex justify-between border-b border-purple-800 pb-1.5">
                  <span className="text-purple-300">รหัสบัตรผ่าน (Pass ID):</span>
                  <span className="font-mono font-bold text-amber-300">{viewingPass.id}</span>
                </div>
                <div className="flex justify-between border-b border-purple-800 pb-1.5">
                  <span className="text-purple-300">ชื่อผู้ขออนุญาต:</span>
                  <span className="font-semibold text-white">{viewingPass.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-purple-800 pb-1.5">
                  <span className="text-purple-300">หน่วยงาน / คณะ:</span>
                  <span className="font-semibold text-white">{viewingPass.department}</span>
                </div>
                <div className="flex justify-between border-b border-purple-800 pb-1.5">
                  <span className="text-purple-300">ประเภทยานพาหนะ / เชื้อเพลิง:</span>
                  <span className="font-semibold text-amber-200">{viewingPass.vehicleType} ({viewingPass.fuelType})</span>
                </div>
                <div className="flex justify-between border-b border-purple-800 pb-1.5">
                  <span className="text-purple-300">จำนวนผู้โดยสารในรถ:</span>
                  <span className="font-bold text-amber-300">{viewingPass.passengers || '1'} คน</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-purple-300">วัตถุประสงค์:</span>
                  <span className="font-medium text-slate-200 truncate max-w-[200px]">{viewingPass.purpose}</span>
                </div>
              </div>

              {/* QR Code & Approval Stamp */}
              <div className="mt-5 flex items-center justify-between bg-white text-slate-800 p-3.5 rounded-2xl shadow-lg relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-slate-950 text-white flex items-center justify-center rounded-xl p-1 shrink-0">
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-current text-white">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm11-2h7v7h-7V2zm2 2v3h3V4h-3zM2 14h7v7H2v-7zm2 2v3h3v-3H4zm13-2h2v2h-2v-2zm3 0h2v4h-2v-4zm-3 3h2v2h-2v-2zm3 2h2v4h-2v-4zm-6-5h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v4h-2v-4zm5 3h2v2h-2v-2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-purple-900 uppercase block tracking-wider">
                      บัตรรับรองความถูกต้อง
                    </span>
                    <p className="text-xs text-slate-600 font-medium mt-0.5">
                      สแกนเพื่อตรวจสอบสถานะออนไลน์
                    </p>
                    <p className="text-[10px] text-slate-400">ผู้อนุมัติ: {viewingPass.approvedBy}</p>
                  </div>
                </div>

                <div className="text-right border-l border-slate-200 pl-3">
                  <div className="w-12 h-12 rounded-full border-2 border-emerald-600 flex items-center justify-center text-emerald-700 font-bold text-[9px] leading-tight text-center rotate-[-12deg] shadow-sm bg-emerald-50">
                    APPROVED<br/>อนุมัติแล้ว
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-[10px] text-purple-300">
                  * กรุณาแสดงบัตรผ่านนี้บริเวณกระจกหน้ารถ หรือแสดงแก่เจ้าหน้าที่จราจรประจำจุดตรวจขึ้นดอย
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ----------------- MODAL: ADMIN LOGIN ----------------- */}
      {showAdminLoginModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAdminAuth} className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-purple-100 text-purple-950 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">เข้าสู่ระบบหลังบ้าน (Admin Login)</h3>
              <p className="text-xs text-slate-500">
                กรอกรหัสผ่านเพื่อเข้าใช้งานระบบจัดการแอดมิน
              </p>
            </div>

            <input
              type="password"
              value={adminPasswordInput}
              onChange={(e) => setAdminPasswordInput(e.target.value)}
              placeholder="กรอกรหัสผ่าน (ทดลองใช้นิ้ว: 1234)"
              autoFocus
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 outline-none text-sm text-center font-bold"
            />

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => { setShowAdminLoginModal(false); setAdminPasswordInput(''); }}
                className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="w-1/2 py-2.5 bg-purple-950 hover:bg-purple-900 text-amber-300 font-bold rounded-xl text-xs shadow"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ----------------- MODAL: ADD / SWITCH ACTIVE YEAR ----------------- */}
      {showAddYearModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-900" /> เพิ่มและเปิดรับสมัครปี พ.ศ. ใหม่
            </h3>
            <p className="text-xs text-slate-500">
              ระบุปี พ.ศ. ใหม่ (เช่น 2570) ระบบจะเพิ่มปีการศึกษา และกำหนดให้เป็นปีที่เปิดรับลงทะเบียนในปัจจุบันทันที
            </p>
            <input
              type="text"
              value={newYearInput}
              onChange={(e) => setNewYearInput(e.target.value)}
              placeholder="เช่น 2570"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 outline-none text-sm font-bold text-center"
            />
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowAddYearModal(false)}
                className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleAddNewYear}
                className="w-1/2 py-2.5 bg-purple-950 hover:bg-purple-900 text-amber-300 font-bold rounded-xl text-xs shadow"
              >
                บันทึกและเปิดใช้
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-4 px-4 text-center text-xs border-t border-slate-800 print:hidden mt-auto">
        <p>ระบบบริหารจัดการบัตรผ่านยานพาหนะ งานประเพณีนำนักศึกษาใหม่ขึ้นไปนมัสการพระบรมธาตุดอยสุเทพ</p>
        <p className="text-slate-500 mt-1">มหาวิทยาลัยเชียงใหม่ (Chiang Mai University)</p>
      </footer>

    </div>
  );
}