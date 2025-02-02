'use client';
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from './TestimonialCard';

interface Testimonial {
  text: string;
  author: string;
  rating: number;
}

function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const response = await fetch('/data/testimonials.json');
      const data = await response.json();
      setTestimonials(data);
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [testimonials.length]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const displayedTestimonials = testimonials.length
    ? [testimonials[currentIndex]]
    : [];

  const desktopDisplayedTestimonials = [
    testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length],
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
  ];

  return (
    <div className="relative w-full max-w-6xl px-4 py-8 mx-auto">
      <div className="flex justify-center items-center space-x-8">
        {(isMobile ? displayedTestimonials : desktopDisplayedTestimonials).map(
          (testimonial, index) => (
            <div
              key={index}
              className={`px-2 flex-none transition-transform duration-300 ease-in-out ${
                index === 1 ? 'scale-110' : ''
              }`}
            >
              <TestimonialCard
                text={testimonial?.text || ''}
                author={testimonial?.author || ''}
                rating={testimonial?.rating || 0}
              />
            </div>
          )
        )}
      </div>

      <button
        aria-label='Previous testimonial'
        onClick={prevTestimonial}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out"
        style={{ background: 'none', border: 'none' }}
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        aria-label='Next testimonial'
        onClick={nextTestimonial}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out"
        style={{ background: 'none', border: 'none' }}
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}

export default TestimonialSlider;
