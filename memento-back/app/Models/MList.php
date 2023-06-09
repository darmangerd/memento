<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MList extends Model
{
    use HasFactory;

    protected $table = 'lists';

    const CREATED_AT = 'creation_date';
    const UPDATED_AT = 'updated_date';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'words',
        'creator',
        'lang_source',
        'lang_def',
    ];

    protected $casts = [
        'words' => 'array',
    ];

    public function creator() {
        return $this->belongsTo(User::class, 'creator', 'id');
    }

    public function lang_source() {
        return $this->belongsTo(Language::class, 'lang_source', 'id');
    }

    public function lang_def() {
        return $this->belongsTo(Language::class, 'lang_def', 'id');
    }
}
