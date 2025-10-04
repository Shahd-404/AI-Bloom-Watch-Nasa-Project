// =========================================================================
// 1. المتغيرات العامة وإدارة التخزين (Global Variables & Storage)
// =========================================================================
let selectedLat = null; 
let selectedLng = null; 
let marker = null; 
let userObservationsData = []; 
const OBS_STORAGE_KEY = 'habb_user_observations'; // مفتاح تخزين الملاحظات
const LAYER_STORAGE_KEY = 'habb_layer_states';   // مفتاح تخزين حالة طبقات الخريطة

// دالة تحميل الملاحظات من الذاكرة المحلية (LocalStorage)
function loadObservations() {
    try { 
        const storedData = localStorage.getItem(OBS_STORAGE_KEY); 
        userObservationsData = storedData ? JSON.parse(storedData) : []; 
    } catch (e) { 
        console.error("Error loading observations from LocalStorage:", e); 
        userObservationsData = []; 
    }
}

// دالة حفظ الملاحظات في الذاكرة المحلية
function saveObservations() {
    try { 
        localStorage.setItem(OBS_STORAGE_KEY, JSON.stringify(userObservationsData)); 
    } catch (e) { 
        console.error("Error saving observations to LocalStorage:", e); 
    }
}

// دالة تحميل حالة طبقات الخريطة (إذا كانت مفعلة أم لا)
function loadLayerStates() {
    try {
        const storedStates = localStorage.getItem(LAYER_STORAGE_KEY);
        // الحالة الافتراضية
        return storedStates ? JSON.parse(storedStates) : { satellite: false, hotspots: false, 'user-obs': false };
    } catch (e) {
        return { satellite: false, hotspots: false, 'user-obs': false };
    }
}

// دالة حفظ حالة طبقة معينة
function saveLayerState(key, isEnabled) {
    const states = loadLayerStates(); 
    states[key] = isEnabled; 
    localStorage.setItem(LAYER_STORAGE_KEY, JSON.stringify(states));
}

// =========================================================================
// 2. دوال مساعدة (Helper Functions)
// =========================================================================

// كائن لإدارة إشعارات التوست (Toast Notifications)
const Toast = {
    show: (message, type = 'success') => {
        const container = document.getElementById('toast-container'); 
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-triangle"></i>';
        toast.innerHTML = `${icon} <span>${message}</span>`; 
        container.appendChild(toast);
        // عرض الإشعار
        setTimeout(() => { toast.classList.add('show'); }, 10);
        // إخفاء وحذف الإشعار بعد 4 ثوانٍ
        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => { toast.remove(); });
        }, 4000); 
    }
};

// دالة تحويل اسم اللون إلى كود Hex
function getColorHex(colorName) {
    switch(colorName) {
        case 'blue': return '#4a90e2'; 
        case 'purple': return '#9c27b0';
        case 'green': return '#8bc34a'; 
        case 'orange': return '#ff9800';
        default: return '#e0e0e0';
    }
}

// إدارة نافذة الصور المنبثقة (Image Modal)
const imageModal = document.getElementById('image-modal'); 
const modalImage = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');
if(modalClose) modalClose.onclick = function() { imageModal.style.display = "none"; }
window.onclick = function(event) { if (event.target == imageModal) { imageModal.style.display = "none"; } }
window.openImageModal = function(src) { modalImage.src = src; imageModal.style.display = "block"; }


// =========================================================================
// 3. محاكاة الاتصال بالـ API (Mock API for Submission & Data)
// =========================================================================
const MockAPI = {
    // دالة مساعدة لتحويل الملف إلى Data URL لعرضه محلياً
    getFileDataUrl: (file) => {
        return new Promise((resolve, reject) => {
            if (!file) return resolve(null);
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    },
    // دالة محاكاة رفع الصور (تأخذ الصورة الأولى وتعطي البقية عناوين وهمية)
    uploadPhotos: async (files) => {
        const dataUrls = [];
        if (files.length > 0) {
            try { 
                const fileArray = Array.from(files);
                const firstFileUrl = await MockAPI.getFileDataUrl(fileArray[0]); 
                dataUrls.push(firstFileUrl);
                // محاكاة عناوين URL للصور الإضافية
                for (let i = 1; i < fileArray.length; i++) { dataUrls.push(`https://picsum.photos/seed/${Date.now() + Math.random() + i}/400/300`); }
            } catch (e) { 
                console.error("Error reading file:", e); 
            }
        } return dataUrls;
    },
    // دالة محاكاة إرسال الملاحظة وحفظها
    submitObservation: (data, photoUrls, isDraft) => {
        return new Promise((resolve) => {
            const observationId = `OBS-${Date.now()}`; 
            const status = isDraft ? 'Draft' : 'Submitted';
            const finalData = { ...data, photoUrls, observationId, status: status, timestamp: new Date().toISOString() };
            userObservationsData.push(finalData); 
            saveObservations(); // حفظ في الذاكرة المحلية
            const success = Math.random() < 0.90; // 90% احتمال نجاح
            setTimeout(() => { resolve(success ? finalData : null); }, 1500); 
        });
    },
    // دالة محاكاة لجلب نقاط الهوت سبوت (Hotspots) للخريطة الحرارية
    getHotspots: () => {
        // بيانات وهمية (خط العرض, خط الطول, الكثافة)
        return [
            [24.01, 32.88, 0.5], [25.10, 31.50, 0.9], [25.0, 32.0, 0.2], [25.5, 31.9, 0.7], 
            [26.8, 32.1, 0.4], [26.1, 30.5, 0.6], [27.0, 32.5, 0.8], [27.1, 31.0, 0.3], 
            [24.9, 32.1, 1.0], [25.0, 31.0, 0.5], [25.2, 32.4, 0.95], [24.7, 32.2, 0.1],
        ];
    }
};

// =========================================================================
// 4. منطق النموذج (Form Logic)
// =========================================================================

// تحديث قيمة شريط التمرير (Slider)
const slider = document.getElementById('percent-blooming'); 
const sliderValue = document.querySelector('.slider-value');
if (slider) slider.oninput = function() { sliderValue.textContent = this.value + '%'; }

// حدث النقر على دوائر الألوان
const colorCircles = document.querySelectorAll('.color-circle');
colorCircles.forEach(circle => {
    circle.addEventListener('click', () => {
        colorCircles.forEach(c => c.classList.remove('selected')); 
        circle.classList.add('selected');
    });
});

// متغيرات رفع الصور
const photoInput = document.getElementById('photo-input'); 
const photoPreview = document.getElementById('photo-preview');
const photoUploadBox = document.querySelector('.photo-upload-box');

// دعم السحب والإفلات (Drag and Drop) لرفع الصور
if (photoUploadBox) {
    photoUploadBox.addEventListener('dragover', (e) => { e.preventDefault(); photoUploadBox.style.borderColor = 'var(--blue-accent)'; });
    photoUploadBox.addEventListener('dragleave', (e) => { e.preventDefault(); photoUploadBox.style.borderColor = '#444'; });
    photoUploadBox.addEventListener('drop', (e) => {
        e.preventDefault(); 
        photoUploadBox.style.borderColor = '#444'; 
        photoInput.files = e.dataTransfer.files;
        photoInput.dispatchEvent(new Event('change')); // تشغيل حدث التغيير لمعالجة الصور
    });
}

// عرض الصور بعد اختيارها
if (photoInput) {
    photoInput.addEventListener('change', () => {
        photoPreview.innerHTML = '';
        Array.from(photoInput.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = e => {
                const img = document.createElement('img'); 
                img.src = e.target.result;
                img.onclick = () => window.openImageModal(e.target.result); // فتح النافذة المنبثقة عند النقر
                photoPreview.appendChild(img);
            }
            reader.readAsDataURL(file);
        });
    });
}

// تجميع بيانات الملاحظة من النموذج
function collectObservationData(isDraft) {
    const selectedColorElement = document.querySelector('.color-circle.selected');
    const colorClass = selectedColorElement ? Array.from(selectedColorElement.classList).find(cls => ['blue', 'purple', 'green', 'orange'].includes(cls)) : 'blue';
    return {
        genusSpecies: document.getElementById('genus-species').value, 
        bloomColor: colorClass,
        percentBlooming: document.getElementById('percent-blooming').value + '%',
        locationLat: selectedLat, 
        locationLng: selectedLng,
        date: document.getElementById('date').value, 
        time: document.getElementById('time').value,
        notes: document.getElementById('notes').value,
    };
}

// التحقق من صحة النموذج قبل الإرسال
function validateForm() {
    let isValid = true;
    // إزالة حالات الخطأ السابقة
    document.querySelectorAll('.form-group.error').forEach(el => el.classList.remove('error'));
    document.querySelector('.checkbox-group').classList.remove('error'); 

    // قواعد التحقق
    if (selectedLat === null || selectedLng === null) { document.getElementById('group-location').classList.add('error'); isValid = false; }
    if (document.getElementById('genus-species').value.trim() === "") { document.getElementById('group-genus-species').classList.add('error'); isValid = false; }
    if (document.getElementById('date').value === "") { document.getElementById('group-date').classList.add('error'); isValid = false; }
    if (!document.getElementById('pledge-checkbox').checked) { document.getElementById('group-pledge').classList.add('error'); isValid = false; }

    if (!isValid) { Toast.show('Please complete all required fields (Location, Bloom Type, Date, and Pledge).', 'error'); }
    return isValid;
}

// معالجة الإرسال (Submit) أو الحفظ كمسودة (Save Draft)
async function handleSubmission(isDraft) {
    if (!isDraft && !validateForm()) { return; } // لا يتحقق من الصحة إذا كانت مسودة
    
    // تعطيل الأزرار لمنع الإرسال المتعدد
    document.getElementById('submit-btn').disabled = true;
    document.getElementById('save-draft-btn').disabled = true;
    
    const data = collectObservationData(isDraft);
    Toast.show('Processing photos and submitting...', 'success');
    
    const photoUrls = await MockAPI.uploadPhotos(photoInput.files);
    const result = await MockAPI.submitObservation(data, photoUrls, isDraft);
    
    // عرض رسالة النجاح أو الفشل
    if (result) {
        const action = isDraft ? 'saved as a draft' : 'submitted successfully';
        Toast.show(`Bloom report ${action}!`, 'success');
        displayUserObservationsOnMap(); 
        if (!isDraft) { resetForm(); } // إعادة تعيين النموذج بعد الإرسال الناجح
    } else { 
        Toast.show('Submission failed: A server error occurred.', 'error'); 
    }

    // إعادة تفعيل الأزرار
    document.getElementById('submit-btn').disabled = false;
    document.getElementById('save-draft-btn').disabled = false;
}

// إعادة تعيين النموذج إلى حالته الأصلية
function resetForm() {
    document.getElementById('observation-form').reset();
    document.querySelectorAll('.color-circle').forEach(c => c.classList.remove('selected'));
    document.querySelector('.color-circle.blue').classList.add('selected');
    sliderValue.textContent = '50%';
    photoPreview.innerHTML = '';
    selectedLat = null; 
    selectedLng = null;
    if (marker) { map.removeLayer(marker); marker = null; }
    document.getElementById('location-input').value = '';
    document.querySelectorAll('.form-group.error').forEach(el => el.classList.remove('error'));
    document.querySelector('.checkbox-group').classList.remove('error'); 
}

// ربط الأزرار بدالة معالجة الإرسال
if (document.getElementById('submit-btn')) {
     document.getElementById('submit-btn').addEventListener('click', () => handleSubmission(false)); // إرسال (Submit)
     document.getElementById('save-draft-btn').addEventListener('click', () => handleSubmission(true));  // حفظ كمسودة (Draft)
}


// =========================================================================
// 5. منطق الخريطة (Map Logic - Leaflet)
// =========================================================================
let map;
let userObservationsLayer; // طبقة لملاحظات المستخدمين
let heatLayer;             // طبقة الخريطة الحرارية (Hotspots)

function initializeMap() {
    if (!document.getElementById('map')) return; 
    
    // تهيئة الخريطة وتعيين العرض الأولي (مصر تقريباً)
    map = L.map('map').setView([25.0, 32.0], 6); 
    window.map = map; 

    // الطبقات الأساسية (Base Layers)
    const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' });
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; Esri' });
    const labelLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', { attribution: 'Esri, Garmin, USGS, NPS', pane: 'markerPane' });
    
    // طبقات الميزات (Feature Layers)
    userObservationsLayer = L.layerGroup();
    const hotspotData = MockAPI.getHotspots();
    heatLayer = L.heatLayer(hotspotData, { radius: 25, gradient: {0.0: 'green', 0.5: 'yellow', 1.0: 'red'} });

    const initialLayerStates = loadLayerStates();
    
    // تفعيل الطبقة الأساسية بناءً على الحالة المحفوظة
    if (initialLayerStates.satellite) { 
        satelliteLayer.addTo(map); 
        labelLayer.addTo(map); 
    } else { 
        streetLayer.addTo(map); 
    }
    document.getElementById('toggle-satellite').checked = initialLayerStates.satellite;

    // تحميل وعرض حالة طبقات الميزات الأولية
    const hotspotsLegendGroup = document.getElementById('hotspots-legend-group');
    hotspotsLegendGroup.style.display = initialLayerStates.hotspots ? 'block' : 'none';
    document.getElementById('toggle-hotspots').checked = initialLayerStates.hotspots;

    loadObservations(); 
    displayUserObservationsOnMap();

    if (initialLayerStates['user-obs']) { userObservationsLayer.addTo(map); }
    document.getElementById('toggle-user-obs').checked = initialLayerStates['user-obs'];
    
    if (initialLayerStates.hotspots) { heatLayer.addTo(map); }
    
    // مُعالجات أحداث تبديل الطبقات
    document.getElementById('toggle-satellite').addEventListener('change', function() {
        if (this.checked) { 
            map.removeLayer(streetLayer); 
            satelliteLayer.addTo(map); 
            labelLayer.addTo(map); 
        } else { 
            map.removeLayer(satelliteLayer); 
            map.removeLayer(labelLayer); 
            streetLayer.addTo(map); 
        }
        saveLayerState('satellite', this.checked);
    });

    document.getElementById('toggle-hotspots').addEventListener('change', function() {
        const legendGroup = document.getElementById('hotspots-legend-group');
        legendGroup.style.display = this.checked ? 'block' : 'none';
        if (this.checked) { heatLayer.addTo(map); } else { map.removeLayer(heatLayer); }
        saveLayerState('hotspots', this.checked);
    });
    
    document.getElementById('toggle-user-obs').addEventListener('change', function() {
        if (this.checked) { userObservationsLayer.addTo(map); } else { map.removeLayer(userObservationsLayer); }
        saveLayerState('user-obs', this.checked);
    });
    
    // حدث النقر على الخريطة لتحديد الموقع
    map.on('click', function(e) {
        if (marker) { map.removeLayer(marker); }
        // أيقونة مخصصة لعلامة الموقع
        const tempIcon = L.divIcon({ className: 'legend-pin-marker', html: '<div class="legend-pin" style="background-color: var(--blue-accent);"></div>', iconSize: [20, 30], iconAnchor: [10, 30] });
        marker = L.marker(e.latlng, { icon: tempIcon }).addTo(map);
        selectedLat = e.latlng.lat; 
        selectedLng = e.latlng.lng;
        document.getElementById('location-input').value = `${selectedLat.toFixed(6)}, ${selectedLng.toFixed(6)}`;
        document.getElementById('group-location').classList.remove('error'); 
    });

    // مُعالج زر استخدام GPS
    document.getElementById('use-gps').addEventListener('click', (e) => {
        e.preventDefault(); 
        if (navigator.geolocation) {
            Toast.show('Acquiring GPS location...', 'success');
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude; 
                    const lng = position.coords.longitude;
                    if (marker) { map.removeLayer(marker); }
                    const tempIcon = L.divIcon({ className: 'legend-pin-marker', html: '<div class="legend-pin" style="background-color: var(--blue-accent);"></div>', iconSize: [20, 30], iconAnchor: [10, 30] });
                    marker = L.marker([lat, lng], { icon: tempIcon }).addTo(map);
                    selectedLat = lat; 
                    selectedLng = lng;
                    document.getElementById('location-input').value = `${selectedLat.toFixed(6)}, ${lng.toFixed(6)}`;
                    map.setView([lat, lng], 14);
                    document.getElementById('group-location').classList.remove('error'); 
                    Toast.show('GPS location determined!', 'success');
                },
                (error) => {
                    Toast.show(`GPS Error: ${error.message || 'Could not access location.'}`, 'error');
                }
            );
        } else {
            Toast.show('Browser does not support geolocation.', 'error');
        }
    });
}

// دالة عرض ملاحظات المستخدمين المرسلة على الخريطة
function displayUserObservationsOnMap() {
    if (!userObservationsLayer) return;
    userObservationsLayer.clearLayers(); // مسح العلامات القديمة
    const customIcon = L.divIcon({ className: 'legend-pin-marker', html: '<div class="legend-pin"></div>', iconSize: [20, 30], iconAnchor: [10, 30] });

    userObservationsData.filter(obs => obs.status === 'Submitted').forEach(obs => {
        if (obs.locationLat && obs.locationLng) {
            const observationMarker = L.marker([obs.locationLat, obs.locationLng], { icon: customIcon });
            
            let photoHtml = '';
            // إنشاء محتوى الصور لنافذة البوب أب
            if (obs.photoUrls && obs.photoUrls.length > 0) {
                const firstPhotoSrc = obs.photoUrls[0];
                photoHtml += '<strong>Photos:</strong><div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px; direction: ltr;">';
                photoHtml += `<img src="${firstPhotoSrc}" alt="User Photo" onclick="openImageModal(this.src)" style="width: 70px; height: 70px; object-fit: cover; border-radius: 4px; cursor: pointer; border: 2px solid var(--blue-accent);">`;
                // عرض مصغرات للصور الإضافية
                for (let i = 1; i < obs.photoUrls.length; i++) {
                    const mockSrc = obs.photoUrls[i];
                    photoHtml += `<img src="${mockSrc}" alt="Photo" onclick="openImageModal(this.src)" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; cursor: pointer;">`;
                }
                photoHtml += '</div>';
            } else { photoHtml = '<strong>Photos:</strong> N/A<br>'; }
            
            // محتوى نافذة البوب أب (Popup)
            let popupContent = `
                <div style="font-family: 'Poppins', sans-serif; max-width: 280px; color: #111; direction: ltr; text-align: left;">
                    <h4 style="margin: 0 0 5px 0; color: ${getColorHex(obs.bloomColor)};">${obs.genusSpecies || 'N/A'}</h4>
                    <hr style="border-top: 1px solid #ddd; margin: 5px 0;">
                    <strong>Status:</strong> ${obs.status}<br><strong>Date:</strong> ${obs.date}<br>
                    <strong>Time:</strong> ${obs.time || 'N/A'}<br><strong>Color:</strong> <span style="font-weight: bold;">${obs.bloomColor}</span><br>
                    <strong>Coverage:</strong> ${obs.percentBlooming}<br><strong>Location:</strong> ${obs.locationLat.toFixed(4)}, ${obs.locationLng.toFixed(4)}<br>
                    <hr style="border-top: 1px solid #ddd; margin: 5px 0;">
                    <strong>Notes:</strong> ${obs.notes ? obs.notes.substring(0, 100) + (obs.notes.length > 100 ? '...' : '') : 'None'}<br>
                    ${photoHtml}
                </div>
            `;
            observationMarker.bindPopup(popupContent, { minWidth: 280, maxWidth: 350 }).addTo(userObservationsLayer);
        }
    });
}

// بدء تهيئة الخريطة بعد تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', initializeMap);